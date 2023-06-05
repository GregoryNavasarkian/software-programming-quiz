import React from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ Component }) => {
  return localStorage.getItem("authToken") ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default Auth;
