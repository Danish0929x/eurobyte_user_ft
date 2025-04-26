import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function PrivateRouter() {
  const isLoggedIn = localStorage.getItem("userData") !== null;

  return isLoggedIn ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRouter;
