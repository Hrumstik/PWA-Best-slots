import { useEffect, useState } from "react";
import { useMixpanel } from "react-mixpanel-browser";
import { v4 as uuidv4 } from "uuid";
import MainView from "./components/MainView";
import AboutView from "./components/AboutView";
import PwaView from "./components/PwaView";
import ReviewsView from "./components/ReviewsView";

export default function Index() {
  const [pwaLink, setPwaLink] = useState("");
  const [view, setView] = useState("main");
  const [isPWAActive, setIsPWAActive] = useState(false);
  const mixpanel = useMixpanel();

  useEffect(() => {
    const isPWAActivated = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsPWAActive(isPWAActivated);

    if (/FBA[NV]/.test(navigator.userAgent)) {
      const intentUrl = `intent://${window.location.hostname}${
        window.location.pathname
      }#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
        window.location.href
      )};end`;
      window.location.href = intentUrl;
    }

    const searchParams = new URLSearchParams(window.location.search);

    let newPwaLink = "https://leppzoo.ru/2fPMF1";

    searchParams.forEach((value, key) => {
      newPwaLink += `${newPwaLink.includes("?") ? "&" : "?"}${key}=${value}`;
    });

    setPwaLink(newPwaLink);

    const trackFirstOpen = () => {
      if (!localStorage.getItem("landing_page_firstOpen_tracked") && mixpanel) {
        const distinct_id = uuidv4();
        console.log(distinct_id);
        localStorage.setItem("userId", distinct_id);

        const params = Object.fromEntries(searchParams);
        params["domain"] = window.location.hostname;

        mixpanel.identify(distinct_id);

        mixpanel.track("landing_page_firstOpen", {
          ...params,
        });

        localStorage.setItem("landing_page_firstOpen_tracked", "true");
      }
    };

    trackFirstOpen();
  }, [mixpanel]);

  let currentView;

  switch (view) {
    case "main":
      currentView = <MainView setView={setView} />;
      break;
    case "about":
      currentView = <AboutView setView={setView} />;
      break;
    case "reviews":
      currentView = <ReviewsView setView={setView} />;
  }

  return isPWAActive ? <PwaView pwaLink={pwaLink} /> : <>{currentView}</>;
}
