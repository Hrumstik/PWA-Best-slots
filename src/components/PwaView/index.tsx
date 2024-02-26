import { useEffect, useState } from "react";
import PageLoader from "../PageLoader";
import StartAgainView from "../StartAgainView";

interface Props {
  pwaLink: string;
}

const PwaView: React.FC<Props> = ({ pwaLink }) => {
  const [view, setView] = useState("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setView("button");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return view === "loading" ? (
    <PageLoader pwaLink={pwaLink} />
  ) : (
    <StartAgainView pwaLink={pwaLink} />
  );
};

export default PwaView;
