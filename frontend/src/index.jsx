import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ReduxProvider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </ReduxProvider>
);
