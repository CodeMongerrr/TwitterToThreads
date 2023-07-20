import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const serviceWorkerFile = "/service-worker.js";
    const serviceWorkerVersion = "v1"; // Update this version whenever you make changes

    navigator.serviceWorker
      .register(serviceWorkerFile, { scope: "./", updateViaCache: "none" })
      .then((registration) => {
        console.log(`Service worker ${serviceWorkerVersion} registered`);
      })
      .catch((error) => {
        console.error("Error registering service worker:", error);
      });
  });
}
ReactDOM.render(<App />, document.getElementById("root"));
