import React from "react";
import { MdLocationOn } from "react-icons/md";

function SearchBar() {
  return (
    <form action="#" className="flex justify-center drop-shadow-md ">
      <MdLocationOn className="py-2 p-2  text-3xl box-content bg-white text-gray-500" />
      <input
        type="search"
        className="p-2.5 px-2 outline-none text-sm w-[400px]"
        placeholder="Search by place and city name "
      />

      <button className="p-2.5 bg-btn-theme hover:brightness-90 text-white">
        Search Events
      </button>
    </form>
  );
}

export default SearchBar;
