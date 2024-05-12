import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

import React from "react";
import { BiLogOut } from "react-icons/bi";
import Cookies from "js-cookie";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  const onLogOut = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <Popup
      modal
      trigger={
        <button className="flex items-center gap-2 hover:text-btn-theme ">
          <BiLogOut /> Logout
        </button>
      }
    >
      {(close) => (
        <div className="flex items-center justify-evenly p-1 md:p-3 gap-3 md:gap-7">
          <div className="">
            <LuLogOut
              color="#D97706"
              className="box-content p-2 rounded-full text-xl md:text-2xl bg-[#f1ca9d] shadow-[0_0_1px_6px_#D9770640]"
            />
          </div>
          <div className="">
            <div className="">
              <h3 className="font-medium">Are you sure you want to Logout?</h3>

              <p className="text-xs text-gray-600">
                If you click on Yes , you'll be logged out
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-1 md:gap-3">
              <button
                className="bg-red-600 leading-4 text-sm p-1.5 text-white border rounded border-red-600"
                onClick={onLogOut}
              >
                Yes, Logout
              </button>
              <button
                className=" text-red-600 leading-4 text-sm  border rounded border-red-600 "
                onClick={() => close()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default Logout;
