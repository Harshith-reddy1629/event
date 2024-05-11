import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import events from "../../constants/dummyEvents.json";
import EventSearch from "../../components/EventSearch";
import { FaLocationDot } from "react-icons/fa6";
import image from "../../assets/party.jpg";
import { BiCalendar } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import LocationLoader from "../../components/LocationLoader";
import "./index.css";
import EventCard from "../../components/EventCard";
function Home() {
  const [coordinates, setCoordinates] = useState(null);
  const [locPermission, setLocPermission] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        setCoordinates([e.coords.latitude, e.coords.longitude]);
        setLocPermission(true);
        console.log(e);
      },
      (e) => {
        setLocPermission(false);
        setCoordinates([]);
        alert("please Give Location Permission");
      }
    );
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="p-6 hd flex items-center">
          <h1 className="text-4xl text-white font-bold ">
            Find and Explore <br /> Amazing Events around you
          </h1>{" "}
        </div>
        <SearchBar /> {!locPermission && !coordinates && <LocationLoader />}
        <div className="grid gap-5 gap-y-8 py-5 grid-cols-[repeat(auto-fill,minmax(450px,1fr))]">
          {events.map((each, i) => (
            <EventCard key={each._id + i} item={each} />
          ))}
        </div>
        {/*
        {!locPermission && coordinates && (
          <p>Location Permission is not granted</p>
        )}
        {locPermission && (
          <div>
            <EventSearch />
            <p>
              Location: {coordinates[0]}, {coordinates[1]}{" "}
            </p>
            <p className="p-1 px-3 bg-gray-300 rounded text-sm shadow w-fit flex gap-1 items-center">
              <FaLocationDot />
              Mahadevpur, Mahadevpur mandal, Jayashankar Bhupalapally District,
              Telangana, 505504, India
            </p>
            <h1>Events Nearby</h1>
            <div className="grid grid-cols-6 gap-5 py-2 ">
              {events.map((e, i) => (
                <div
                  key={i}
                  style={{
                    background: `url(${image})`,
                    backgroundSize: "contain",
                  }}
                  className="relative aspect-[1/1.2]  gap-2 shadow-md  flex flex-col items-center rounded p-2 overflow-hidden"
                >
                  <p className="text-sm absolute top-0 left-0 w-full leading-4 shadow-md p-2 px-2 text-center font-medium bg-[#3c605f] text-white">
                    {" "}
                    {e.title}
                  </p>
                  {/* <img
                    alt="."
                    src={image}
                    className="  h-1/2 drop-shadow-md rounded-md box-content  "
                  /> */}
        {/*<div className="absolute bottom-0 text-white text-center  px-2 bg-[#00000029] shadow-md  w-full left-0 backdrop-blur-[2px]">
                    <div className="flex justify-between w-full text-[13px] font-medium p-1">
                      <p className="flex gap-1 items-center">
                        <BiCalendar /> {e.date && e.date.slice(0, 10)}
                      </p>
                      <p className="flex gap-1 items-center">
                        {" "}
                        <BsClock /> {e.time}
                      </p>
                    </div>
                    <p className="rounded p-1 text-sm shadow">{e.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Home;
