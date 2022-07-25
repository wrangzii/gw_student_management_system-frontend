import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/partials/Navbar";
import RouteLink from "./components/Router/RouteLink";
import AuthApi from "./components/authentication/AuthApi";

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <div className="App">
          <Navbar />
          <RouteLink />
        </div>
      </Router>
    </AuthApi.Provider>
  );
}

export default App;
