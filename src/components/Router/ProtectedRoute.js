import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Navigate to="/login" />)}
    />
  );
};

export default ProtectedRoute;
