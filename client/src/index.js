import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "./context/appContext";
import Modal from "react-modal";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/index.css";

Modal.setAppElement("#root");

ReactDOM.render(
  <AppContextProvider>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </AppContextProvider>,
  document.getElementById("root")
);
