import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicRoutes, privateRoutes } from "~/route";
import Navbar from "./components/Navbar";
import { useAuth } from "./store/auth";
import "./styles/base.scss"

function App() {
  const { auth } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="container">
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
      </div>
    </Router>
  );
}

export default App;
