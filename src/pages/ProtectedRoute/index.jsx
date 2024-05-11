import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Cookies from "js-cookie";
function ProtectedRoute() {
  const Token = Cookies.get("token");

  if (Token) {
    return (
      <div className="flex ">
        <Sidebar />
        <div className="flex-grow p-4 h-[100dvh] overflow-y-auto ">
          <Outlet />
        </div>
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
