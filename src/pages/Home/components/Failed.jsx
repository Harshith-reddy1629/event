import React from "react";

import { BiSolidError } from "react-icons/bi";

function Failed({ fetchEvents }) {
  return (
    <div className="flex flex-col gap-2 items-center min-h-60">
      {/* <div className="bg-[#e729297c] rounded-full"> */}
      <BiSolidError size={60} className="text-red-500   mx-auto" />
      <h1 className="font-bold text-lg">OOPS!</h1>
      <p>Something went wrong</p>
      <button
        className="bg-red-500 p-2 px-5 text-white shadow-lg"
        onClick={() => {
          fetchEvents();
        }}
      >
        Try Again
      </button>
      {/* </div> */}
    </div>
  );
}

export default Failed;
