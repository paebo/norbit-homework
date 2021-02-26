import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CoordinateProvider } from "./components/Map/CoordinateProvider";

ReactDOM.render(
  <React.StrictMode>
    <CoordinateProvider>
      <App />
    </CoordinateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
