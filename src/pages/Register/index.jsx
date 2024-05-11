import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <form className="bg-white rounded-md shadow-md max-w-[400px] w-full min-w-[320px] flex flex-col gap-2 p-3  ">
        <h2 className="my-3 text-center text-2xl font-medium">Register</h2>
        <div className="flex flex-col gap-0.5 ">
          <label>Name</label>
          <input
            placeholder="Enter your name"
            className="p-2 bg-gray-200 outline-none"
          />
        </div>
        <div className="flex flex-col gap-0.5 ">
          <label>Username</label>
          <input
            placeholder="Enter your username"
            className="p-2 bg-gray-200 outline-none"
          />
        </div>
        <div className="flex flex-col gap-0.5 ">
          <label>Email</label>
          <input
            placeholder="Enter Email"
            className="p-2 bg-gray-200 outline-none"
          />
        </div>

        <div className="flex flex-col gap-0.5 ">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="p-2 bg-gray-200  outline-none"
          />
        </div>
        <div className="flex flex-col gap-0.5 ">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="p-2 bg-gray-200  outline-none"
          />
        </div>
        <button className="p-2 mt-3 bg-btn-theme text-white font-medium">
          Register
        </button>
        <p className="text-xs text-center">
          Already have an Account?{" "}
          <Link to="/login" className="text-blue-700">
            {" "}
            Login
          </Link>{" "}
        </p>
      </form>
    </>
  );
}

export default Register;
