import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "~/route";
import Navbar from "./components/partials/Navbar";
import { RequireAuth } from "./route/RequireAuth";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <RequireAuth>
                  <Page />
                </RequireAuth>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
