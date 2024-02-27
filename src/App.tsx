import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import mixpanel from "mixpanel-browser";
import MainView from "./components/MainView";
import AboutView from "./components/AboutView";
import PwaView from "./components/PwaView";
import ReviewsView from "./components/ReviewsView";

export default function Index() {
  const [pwaLink, setPwaLink] = useState("");
  const [view, setView] = useState("main");
  const [isPWAActive, setIsPWAActive] = useState(false);

  useEffect(() => {
    const isPWAActivated = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsPWAActive(isPWAActivated);

    if (/FBA[NV]/.test(navigator.userAgent)) {
      window.open(window.location.href, "_blank");
    }

    const searchParams = new URLSearchParams(window.location.search);
    let newPwaLink = "https://leppzoo.ru/2fPMF1";

    searchParams.forEach((value, key) => {
      newPwaLink += `${newPwaLink.includes("?") ? "&" : "?"}${key}=${value}`;
    });

    setPwaLink(newPwaLink);

    const trackFirstOpen = () => {
      if (!localStorage.getItem("landing_page_firstOpen_tracked")) {
        const distinct_id = uuidv4();
        localStorage.setItem("userId", distinct_id);

        const params = Object.fromEntries(searchParams);
        params["domain"] = window.location.hostname;

        mixpanel.identify(distinct_id);

        mixpanel.track("landing_page_firstOpen", {
          distinct_id,
          ...params,
        });

        localStorage.setItem("landing_page_firstOpen_tracked", "true");
      }
    };

    trackFirstOpen();
  }, []);

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
