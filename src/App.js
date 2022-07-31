import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "~/components/partials/Navbar";
import { publicRoutes, privateRoutes } from "~/components/route";

function App() {
  const [isAuthen, setIsAuthen] = useState(false);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {!isAuthen
            ? publicRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route key={index} path={route.path} element={<Page />} />
                );
              })
            : privateRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route key={index} path={route.path} element={<Page />} />
                );
              })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
