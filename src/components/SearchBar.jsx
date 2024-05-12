import React from "react";
import { MdLocationOn } from "react-icons/md";

function SearchBar() {
  return (
    <form
      action="#"
      onSubmit={(e) => e.preventDefault()}
      className="flex justify-center "
    >
      <div className="flex items-center bg-white shadow-md max-w-[600px] w-full">
        {" "}
        <MdLocationOn className="p-1 pl-2  pr-0 box-content text-2xl text-gray-600 shrink-0" />
        <input
          type="search"
          className="p-2.5 grow px-2 outline-none text-sm md:text-base "
          placeholder="Search by place and city name "
        />
        <button className="font-semibold  h-full bg-btn-theme text-white p-1 px-2 !leading-4 text-sm md:text-base">
          Search Events
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
