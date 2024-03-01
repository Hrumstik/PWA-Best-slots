import { useEffect, useState } from "react";
import { useMixpanel } from "react-mixpanel-browser";
import { v4 as uuidv4 } from "uuid";
import MainView from "./components/MainView";
import AboutView from "./components/AboutView";
import PwaView from "./components/PwaView";
import ReviewsView from "./components/ReviewsView";

export default function Index() {
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
    let pixelId: string | null = "";

    if (searchParams.has("idpixel")) {
      pixelId = searchParams.get("idpixel");
      newPwaLink += `?sub_id_7=${pixelId}`;
    }

    searchParams.forEach((value, key) => {
      if (key !== "idpixel") {
        newPwaLink += `${newPwaLink.includes("?") ? "&" : "?"}${key}=${value}`;
      }
    });

    const pwaLink = localStorage.getItem("pwaLink");
    if (!pwaLink) {
      localStorage.setItem("pwaLink", newPwaLink);
    }

    console.log(window.location.href);
    console.log(newPwaLink);

    const trackFirstOpen = () => {
      if (!localStorage.getItem("landing_page_firstOpen_tracked") && mixpanel) {
        const distinct_id = uuidv4();
        localStorage.setItem("userId", distinct_id);

        const params = Object.fromEntries(searchParams);
        params["domain"] = window.location.hostname;
        params["startURL"] = window.location.href;
        params["pwaLink"] = newPwaLink;

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

  return isPWAActive ? <PwaView /> : <>{currentView}</>;
}
