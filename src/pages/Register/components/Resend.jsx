import React, { forwardRef, useState } from "react";
import api from "../../../context/apiInstance";
import { CgClose } from "react-icons/cg";
import { GoAlert } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdMarkEmailRead } from "react-icons/md";

const MainCode = ({ closeError }, ref) => {
  const [status, setStatus] = useState("initial");

  const [errors, setErrors] = useState("");

  const mailRef = ref.current.value;

  const ResendMail = async () => {
    try {
      console.log("first");
      if (mailRef) {
        console.log("first 1");
        const response = await api.post("/user/resend-mail", {
          email: mailRef,
        });

        setStatus("Success");
      } else {
        setStatus("error");
        setErrors({ error: "Please Enter Email" });
      }
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      setStatus("error");
      setErrors(data);
    }
  };

  return (
    <>
      <div className="p-2 bg-green-400 rounded-full  ">
        <MdMarkEmailRead size={25} className="text-green-950" />
      </div>
      <h1 className="font-medium text-btn-theme text-2xl leading-7">
        Your Account was created
      </h1>

      <p className="text-sm leading-4 text-gray-600">
        Please verify your email. We sent an email to {mailRef}
      </p>
      <p className="text-[10px] leading-4 text-gray-500">
        Just click on the link in that email to complete your signup. If you
        don't see it, you may need to{" "}
        <span className="font-semibold text-gray-700"> check your spam </span>{" "}
        folder.
      </p>
      <button
        name="button"
        id="resendBtn"
        type="button"
        onClick={ResendMail}
        className="p-1.5 mt-1 m-0 shadow  text-sm text-white px-5 bg-btn-theme font-medium"
      >
        {" "}
        Resend Verification Email
      </button>
    </>
  );
};

const Resend = forwardRef(MainCode);

export default Resend;
