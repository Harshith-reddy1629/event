import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Cookies from "js-cookie";
import { FaRegUserCircle } from "react-icons/fa";
function ProtectedRoute() {
  const Token = Cookies.get("token");

  if (Token) {
    return (
      <div className="flex ">
        <Sidebar />
        <div className="flex-grow  h-[100dvh] overflow-y-auto ">
          <Header />
          <Outlet />
        </div>
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
