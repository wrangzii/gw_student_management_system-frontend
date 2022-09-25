import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicRoutes, privateRoutes } from "~/route";
import { useAuth } from "./store/auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./styles/base.scss";
import "react-toastify/dist/ReactToastify.css";

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
      <Footer />
    </Router>
  );
}

export default App;
