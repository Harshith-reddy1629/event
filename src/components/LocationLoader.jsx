import React from "react";
import { IoIosWarning } from "react-icons/io";
import locationImg from "../assets/loc.png";

function LocationLoader() {
  return (
    <div className="w-full  flex flex-col justify-center items-center gap-3 py-5">
      <img
        src={locationImg}
        alt="."
        className="h-[120px] w-auto animate-pulse opacity-70"
      />
      <p className="uppercase font-mono font-bold ">Locating...</p>
      <p className="p-2 flex gap-1 items-center bg-white rounded-md text-xs shadow border-l-4  font-bold text-gray-600 border-[#ff3b3b]">
        <IoIosWarning className="mt-[2px]" /> Grant Location Permission
      </p>
    </div>
  );
}

export default LocationLoader;
