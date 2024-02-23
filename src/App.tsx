import { useEffect, useState } from "react";
import PageLoader from "./components/PageLoader";
import MainView from "./components/MainView";
import AboutView from "./components/AboutView";

export default function Index() {
  const [pwaLink, setPwaLink] = useState(
    "https://benioosn.com/ee27112d91?extra_param_1=49487"
  );
  const [view, setView] = useState("main");
  const [isPWAActive, setIsPWAActive] = useState(false);
  useEffect(() => {
    const isPWAActiveted = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isPWAActiveted) {
      setIsPWAActive(true);
    }

    const searchParams = new URLSearchParams(window.location.search);
    let newPwaLink = pwaLink;

    for (const param of searchParams) {
      const [key, value] = param;
      newPwaLink += `&${key}=${value}`;
    }

    setPwaLink(newPwaLink);
  }, [pwaLink]);

  let currentView;

  switch (view) {
    case "main":
      currentView = (
        <MainView setIsPWAActive={setIsPWAActive} setView={setView} />
      );
      break;
    case "about":
      currentView = <AboutView setView={setView} />;
      break;
  }

  return isPWAActive ? (
    <PageLoader isPWAActiveted={isPWAActive} pwaLink={pwaLink} />
  ) : (
    <>{currentView}</>
  );
}
