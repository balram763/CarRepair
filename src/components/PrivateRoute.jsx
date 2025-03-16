import React from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import Loading from "./Loading";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoggedIn, checking } = useAuthStatus();

  if (checking) {
    return <Loading />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
