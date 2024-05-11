import React from "react";
import SearchBar from "./SearchBar";
import "./Header.css";

function Header() {
  return (
    <header className="p-3 md:px-5 lg:px-8 px-3 flex justify-between gap-2 header bg-[#fff] ">
      <div>
        <h1 className="text-lg lg:text-xl font-semibold tracking-wider">
          LOGO
        </h1>
      </div>
      <SearchBar />
      <div>
        <button className="bg-slate-500  p-4 py-1 rounded-md shadow text-white font-medium">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
