import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./Redux/store/store.tsx";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import mixpanel from "mixpanel-browser";
import English from "./Locales/English.json";
import "normalize.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered:", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed:", registrationError);
      });
  });
}

const userLocale = navigator.language;

mixpanel.init("fd83b7f99d2ae16871a7219fe717bd8e", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale={userLocale} messages={English}>
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>
);
