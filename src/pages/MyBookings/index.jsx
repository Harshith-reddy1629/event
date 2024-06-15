import React, { Fragment, useEffect, useState } from "react";
import { BsCalendar2Event } from "react-icons/bs";
import { Link } from "react-router-dom";
// import EventSearch from "../../components/EventSearch";
import { BiLoader, BiSearchAlt, BiSolidError } from "react-icons/bi";
import "./index.css";
// import { MdOutlineErrorOutline } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import axios from "axios";
import Cookies from "js-cookie";
import api from "../../context/apiInstance";

function MyBookings() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("initial");
  const [showDetails, setDetails] = useState(false);

  const FetchEvents = async () => {
    try {
      setStatus("loading");

      const response = await api.get("/events/get-events-booked", {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setStatus("success");
      setEvents(response.data);
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    FetchEvents();
  }, []);

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
      {status === "initial" && (
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
      )}
      {events.length === 0 && status === "success" && (
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
      )}
      {status === "loading" && (
        <div className="flex justify-center items-center h-56 animate-spin">
          <BiLoader size={26} className=" " />
        </div>
      )}{" "}
      {status === "success" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2  ">
          {events.map((e, i) => (
            <Fragment key={i}>
              <div className="p-2 px-4 shadow-md bg-white bg-opacity-65">
                <img
                  src={e.events_booked[0].image}
                  className="h-[180px] object-contain w-full"
                />
                <div className="text-sm py-2 bg-slate-200 px-2 rounded-md shadow">
                  <h1>
                    {" "}
                    Title:{" "}
                    <span className="font-bold text-gray-800">
                      {e.events_booked[0].title}{" "}
                    </span>
                  </h1>
                  <p>Location: {e.events_booked[0].address}</p>
                  {showDetails && (
                    <div className="transition duration-1000">
                      <p className="text-xs text-gray-600 mt-2">
                        Payment ID: {e.payment_id}
                      </p>
                      <p className="text-xs text-gray-600">
                        Order ID: {e.order_id}
                      </p>
                    </div>
                  )}
                  {/* <div className=""> */}

                  {showDetails ? (
                    <IoIosArrowUp
                      className="mx-auto mt-1"
                      onClick={() => {
                        setDetails(false);
                      }}
                    />
                  ) : (
                    <IoIosArrowDown
                      className="mx-auto mt-1"
                      onClick={() => {
                        setDetails(true);
                      }}
                    />
                  )}
                  {/* </div> */}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}
      {status === "error" && (
        <div className="h-72 flex flex-col justify-center items-center gap-1">
          <BiSolidError size={60} className="text-red-500 " />
          <p>Some thing went wrong</p>
          <button
            className="text-sm p-2 mt-4 border-2 px-6 shadow-lg text-red-500 duration-300 hover:bg-red-500 hover:text-white border-red-500"
            onClick={() => {
              FetchEvents();
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
