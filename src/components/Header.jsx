import React from "react";
import SearchBar from "./SearchBar";
import "./Header.css";
import { FaRegUserCircle } from "react-icons/fa";

function Header() {
  return (
    <header className="p-2 bg-slate-100 sticky top-0 px-4 flex justify-between z-10 ">
      <p className="w-6"></p>
      <div className="font-extrabold text-gray-500 tracking-wider md:hidden   bg-gray-300 p-0.5 px-2 text-base">
        LOGO
      </div>
      <div className="relative">
        <FaRegUserCircle
          className="bg-white p-1  rounded-full shadow-md"
          size={28}
        />
        {/* <ul className="absolute top-[110%]  right-0 w-[150px] bg-white overflow-hidden rounded shadow-md">
          <li className="text-sm p-2 hover:bg-slate-100">Account</li>
          <li className="text-sm p-2 hover:bg-slate-100">Notifications</li>
        </ul> */}
      </div>
    </header>
  );
}

export default Header;
