import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "~/store/auth";
import { PaginationProvider } from "~/store/pagination";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PaginationProvider>
        <ToastContainer />
        <App />
      </PaginationProvider>
    </AuthProvider>
  </React.StrictMode>
);
