import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicRoutes, privateRoutes } from "~/route";
import { useAuth } from "./store/auth";
import "./styles/base.scss";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "./layout/defaultLayout";

function App() {
  const { auth } = useAuth();

  return (
    <Router>
      <DefaultLayout>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
          {auth.accessToken &&
            privateRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
        </Routes>
      </DefaultLayout>
    </Router>
  );
}

export default App;
