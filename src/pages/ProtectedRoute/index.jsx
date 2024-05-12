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
          <header className="p-3 bg-slate-100 sticky top-0 px-4 flex justify-between z-10 ">
            <p className="w-6"></p>
            <div className="font-extrabold text-gray-500 tracking-wider md:hidden   bg-gray-300 p-0.5 px-2 text-base">
              LOGO
            </div>
            <FaRegUserCircle size={25} />
          </header>
          <Outlet />
        </div>
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
