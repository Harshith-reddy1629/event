import React from "react";
import "./Sidebar.css";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="relative border-r border-[#ccc] h-[100dvh] w-[220px] flex-shrink-0">
      <div className="p-4">LOGO</div>
      <ul className="flex flex-col ">
        <Link to="/" className={`li-el ${pathname === "/" && "active-tab"}`}>
          Explore Events
        </Link>
        <Link
          to="/create-event"
          className={`li-el ${pathname === "/create-event" && "active-tab"}`}
        >
          + Create Event
        </Link>
        <Link
          to="/my-events"
          className={`li-el ${pathname === "/my-events" && "active-tab"}`}
        >
          My Events
        </Link>
        <Link
          to="/my-bookings"
          className={`li-el ${pathname === "/my-bookings" && "active-tab"}`}
        >
          My Bookings
        </Link>
      </ul>
      <div className="absolute bottom-2 left-0 p-3 text-center w-full border-t border-[#ccc] flex justify-center">
        <button className="flex items-center gap-2 hover:text-btn-theme ">
          <BiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
