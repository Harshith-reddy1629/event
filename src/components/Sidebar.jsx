import React, { useState } from "react";
import "./Sidebar.css";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LuMenu } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import Logout from "./Logout";
function Sidebar() {
  const { pathname } = useLocation();
  const [sideStat, setSideStat] = useState(false);
  const navigate = useNavigate();

  const onLogout = async () => {
    Cookies.remove("token");

    navigate("/login");
  };

  return (
    <>
      <aside
        className={` ${
          !sideStat ? "-translate-x-full" : "translate-x-0"
        } duration-500 absolute  md:relative border-r md:bg-none  md:translate-x-0  z-20  bg-gradient-to-br from-gray-100 to-slate-300 border-[#ccc] h-[100dvh] w-[220px] flex-shrink-0`}
      >
        <div className="p-4 relative">
          LOGO{" "}
          <button
            onClick={() => setSideStat(!sideStat)}
            className="p-2 bg-slate-200 hover:bg-slate-300 absolute left-[104%] top-2 rounded-md md:hidden"
          >
            {sideStat ? <RxCross2 /> : <LuMenu size={18} />}
          </button>
        </div>
        <ul className="flex flex-col ">
          <Link
            to="/"
            className={`li-el ${pathname === "/" && "active-tab"}`}
            onClick={() => setSideStat(!sideStat)}
          >
            Explore Events
          </Link>
          <Link
            to="/create-event"
            className={`li-el ${pathname === "/create-event" && "active-tab"}`}
            onClick={() => setSideStat(!sideStat)}
          >
            + Create Event
          </Link>
          <Link
            to="/my-events"
            onClick={() => setSideStat(!sideStat)}
            className={`li-el ${pathname === "/my-events" && "active-tab"}`}
          >
            My Events
          </Link>
          <Link
            to="/my-bookings"
            onClick={() => setSideStat(!sideStat)}
            className={`li-el ${pathname === "/my-bookings" && "active-tab"}`}
          >
            My Bookings
          </Link>
        </ul>
        <div className="absolute bottom-2 left-0 p-3 text-center w-full border-t border-[#ccc] flex justify-center">
          <Logout />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
