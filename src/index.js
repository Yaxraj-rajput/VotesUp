import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("It's a win win, when console is so clean");

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
