import React, { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";

import { Link, useParams } from "react-router-dom";
import api from "../../context/apiInstance";

import { MdOutlineErrorOutline } from "react-icons/md";
function Verification() {
  const [status, setStatus] = useState("initial");

  const [err, setErr] = useState("");

  const { id } = useParams();

  const verifyemail = async () => {
    try {
      setStatus("verifying");
      const response = await api.get(`/user/verify/${id}`);
      setStatus("Success");
    } catch (error) {
      setStatus("failed");
      setErr(error?.response?.data?.error);
    }
  };

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center p-4 flex-col gap-2 ">
      <div className="flex relative overflow-hidden flex-col justify-center items-center gap-1 p-3 py-5 bg-white rounded text-center max-w-[300px] w-full shadow-md ">
        {
          <>
            <div className="font-extrabold text-gray-500 tracking-wider bg-gray-300 p-1 px-2 text-xl">
              LOGO
            </div>

            <h4 className="font-medium text-xl mt-2 leading-6">
              Click here to verify your Email
            </h4>
            <p className="leading-4  text-sm text-gray-500">
              Please confirm that you want to use Event Booking App
            </p>
            <button
              onClick={verifyemail}
              type="button"
              className="bg-btn-theme w-full mt-3   text-white shadow-md rounded p-[6px_20px]"
            >
              VERIFY
            </button>
          </>
        }

        {status === "verifying" && (
          <div className="absolute flex h-full w-full top-0 left-0 justify-center items-center bg-[#f4f2f294] ">
            <BiLoaderAlt size={35} className="text-[#316853] animate-spin " />
          </div>
        )}
        {status === "Success" && (
          <div className="absolute flex h-full w-full top-0 left-0 flex-col justify-center items-center gap-2 bg-[#ffffff] ">
            <FaRegCircleCheck
              size={30}
              className="text-[#316853]  shadow-[0_0_1px_5px_#e9fff2] bg-green-300 box-content p-2  rounded-full"
            />
            <h1>Verification Successfull</h1>
            <Link
              to="/login"
              className="bg-btn-theme p-1.5 px-6 text-white text-sm font-medium tracking-wider shadow-md"
            >
              LOGIN
            </Link>
          </div>
        )}
        {status === "failed" && (
          <div className="absolute flex h-full w-full top-0 left-0 flex-col justify-center items-center  bg-[#ffffff] ">
            <MdOutlineErrorOutline
              size={30}
              className="text-[#dd4141]  shadow-[0_0_1px_6px_#dd414120] bg-red-200 box-content p-2 mb-3 rounded-full"
            />
            <h1>Verification Failed</h1>
            {err && <p className="text-sm text-gray-600">{err}</p>}
            <button
              onClick={() => setStatus("initial")}
              className="bg-[#dd4141] p-1.5 px-6 mt-2 text-white text-sm font-medium tracking-wider shadow-md"
            >
              Retry
            </button>
          </div>
        )}
      </div>{" "}
      {status === "failed" && (
        <Link
          to="/"
          className="bg-slate-600 p-1.5  text-xs text-white rounded-full shadow-lg px-5"
        >
          {" "}
          Return to Login{" "}
        </Link>
      )}
    </div>
  );
}

export default Verification;
