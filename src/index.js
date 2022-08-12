import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "~/store/auth";
import { PaginationProvider } from "~/store/pagination";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PaginationProvider>
        <App />
      </PaginationProvider>
    </AuthProvider>
  </React.StrictMode>
);
