import React from "react";
import { BsCalendar2Event } from "react-icons/bs";
import { Link } from "react-router-dom";
import EventSearch from "../../components/EventSearch";
import { BiSearchAlt } from "react-icons/bi";
function MyBookings() {
  return (
    <div className="p-3">
      {" "}
      <h1 className="text-2xl">My Bookings</h1>
      <div className="py-3">
        <div className="flex max-w-80 bg-btn-theme  text-white ">
          <input
            type="search"
            className="p-1 px-2 w-full outline-none text-sm "
            placeholder="Search by event name "
          />
          <label className="p-3 ">
            <BiSearchAlt />
          </label>
        </div>
      </div>
      <div className="flex flex-col text-gray-700 gap-6 justify-center text-center items-center h-[450px]">
        <BsCalendar2Event size={140} />
        <p>You don't have any bookings yet. book your first event</p>
        <Link
          to="/"
          className="p-3  bg-btn-theme font-medium shadow-md text-white  "
        >
          Book an event
        </Link>
      </div>
    </div>
  );
}

export default MyBookings;
