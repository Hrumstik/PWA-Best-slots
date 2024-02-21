import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./Redux/store/store.tsx";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import English from "./Locales/English.json";
import "normalize.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale={userLocale} messages={English}>
        <RouterProvider router={router} />
      </IntlProvider>
    </Provider>
  </React.StrictMode>
);
