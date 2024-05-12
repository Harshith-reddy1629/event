import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="h-[100dvh] flex justify-center items-center text-center p-3">
      <div>
        <h1 className="text-8xl font-serif font-black ts ">404</h1>
        <p className="my-4 text-lg font-medium">OOPS! PAGE NOT FOUND</p>
        <p className="leading-5 text-sm text-gray-600 mb-5">
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </p>
        <Link
          to="/"
          className="bg-slate-600 p-2 text-white rounded-full shadow-md px-5 "
        >
          {" "}
          Return Home{" "}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
