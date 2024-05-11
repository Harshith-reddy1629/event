import React, { forwardRef, useState } from "react";
import api from "../../../context/apiInstance";
import { CgClose } from "react-icons/cg";
import { GoAlert } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const MainCode = ({ closeError }, ref) => {
  const [status, setStatus] = useState("initial");

  const [errors, setErrors] = useState("");

  const ResendMail = async () => {
    try {
      const resMail = ref.current.value;

      if (resMail) {
        const response = await api.post("/user/resend-mail", {
          email: resMail,
        });
        setStatus("Success");
      } else {
        setStatus("error");
        setErrors({ error: "Please Enter Email" });
      }
    } catch (error) {
      const { data } = error.response;
      setStatus("error");
      setErrors(data);
    }
  };

  return (
    <>
      <div
        className={`p-1.5 relative px-2 bg-slate-100  border-l-4 ${
          status === "Success" ? "border-green-600" : "border-red-500"
        }`}
      >
        {status === "initial" && (
          <>
            {" "}
            <div className="flex items-center gap-3">
              <GoAlert size={20} className="text-red-600" />
              <div>
                <h1 className="text-xs font-medium flex  gap-1 items-center">
                  Please Verify Your Email Address
                </h1>
                <p className="text-xs text-gray-500 ">
                  Your mail{" "}
                  <span className="text-black font-medium">
                    [{ref.current?.value}]{" "}
                  </span>
                  has not been verified
                </p>
                <button
                  name="button"
                  id="resendBtn"
                  type="button"
                  onClick={ResendMail}
                  className="p-1.5 mt-1 m-0 text-xs text-white px-5 bg-btn-theme font-medium"
                >
                  {" "}
                  Resend Mail
                </button>
              </div>
            </div>
          </>
        )}
        {status === "error" && (
          <>
            {" "}
            <button
              onClick={() => setStatus("initial")}
              className="text-[10px] p-0.5 px-1 bg-red-500 text-white mb-1"
              name="back"
              id="back"
            >
              {" "}
              Back{" "}
            </button>
            <p className="text-xs text-gray-700 ">
              <span className="font-medium">Error:</span> {errors?.error}
            </p>
          </>
        )}
        {status === "Success" && (
          <>
            {" "}
            <p className="text-xs font-medium text-gray-700 flex gap-1 items-center">
              <IoMdCheckmarkCircleOutline
                size={15}
                className="text-green-600"
              />{" "}
              Mail Sent.
            </p>
          </>
        )}
        <div className="absolute top-0 right-0 translate-x-[30%] -translate-y-[30%] rounded-full bg-slate-600  hover:bg-red-600 transition-all  p-0.5 text-[10px] text-white">
          <CgClose onClick={closeError} />
        </div>
      </div>
    </>
  );
};

const Resend = forwardRef(MainCode);

export default Resend;
