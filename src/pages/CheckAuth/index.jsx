import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import "./index.css";

import Cookies from "js-cookie";

function CheckAuth() {
  const Token = Cookies.get("token");

  if (Token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex md:flex-row flex-col ">
      <div className="p-4 py-10 md:flex-[1_1_55%] hidden md:flex  flex-col gap-3  items-center justify-center text-center font-black text-5xl md:text-7xl leading-[55px]  bg-btn-theme ">
        <h1 className="td">Welcome</h1>
        <p className="font-medium text-xl td leading-4 font-medium  ">
          Find and book Events
        </p>
      </div>
      <div className="p-4 relative md:flex-[1_1_45%]   h-[100dvh]  flex flex-col gap-3 items-center justify-center overflow-y-auto ">
        <div className="font-extrabold text-gray-500 tracking-wider absolute top-3 left-3 bg-gray-300 p-1 px-2 text-xl">
          LOGO
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default CheckAuth;
