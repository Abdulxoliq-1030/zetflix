import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import "./base.scss";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
    <ToastContainer autoClose={8000} />
  </BrowserRouter>
);
