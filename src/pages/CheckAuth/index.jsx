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
    <div className="flex ">
      <div className="p-4 flex-[1_1_60%] flex flex-col gap-3  items-center justify-center text-center font-black text-7xl leading-[55px]  bg-btn-theme ">
        <h1 className="td ">Welcome</h1>
        <p className="font-medium text-xl td leading-4 font-medium  ">
          Find and book Events
        </p>
      </div>
      <div className="p-4 flex-[1_1_40%]  h-[100dvh] flex flex-col gap-3 items-center justify-center overflow-y-auto ">
        <Outlet />
      </div>
    </div>
  );
}

export default CheckAuth;
