import React, { useEffect } from "react";

import Sidebar from "../../components/Sidebar";

import Header from "../../components/Header";

import { Navigate, Outlet } from "react-router-dom";

import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";

import { fetchEvents } from "../../store/slice";

function ProtectedRoute() {
  const selector = useSelector((store) => store.events);
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        dispatch(
          fetchEvents({
            lat: e.coords.latitude ?? 18.66,
            long: e.coords.longitude ?? 80.03,
          })
        );
      },
      (e) => {
        alert("please Give Location Permission");
      }
    );
  }, []);

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
