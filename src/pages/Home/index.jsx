import React, { useEffect, useRef, useState } from "react";

import SearchBar from "../../components/SearchBar";

import "./index.css";

import EventCard from "../../components/EventCard";

import Failed from "./components/Failed";

import EmptyView from "./components/EmptyView";

import { LuLoader2 } from "react-icons/lu";

import { useSelector } from "react-redux";

function Home() {
  const { data, status, error } = useSelector((state) => state.events);

  return (
    <>
      <div className="flex flex-col gap-3 p-4">
        <div className="p-6 hd flex items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold ">
            Find and Explore <br /> Amazing Events around you
          </h1>{" "}
        </div>
        <div className="">
          <SearchBar />
        </div>

        {status === "failed" && (
          <>
            <Failed />
          </>
        )}
        {(status === "loading" || status === "initial") && (
          <div className="flex justify-center items-center h-64">
            <LuLoader2 size={40} className="animate-spin" />
          </div>
        )}

        {status === "success" && (
          <>
            <div className="grid gap-5 gap-y-8 py-5 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))]">
              <>
                {" "}
                {data.map((each, i) => (
                  <EventCard key={each._id + i} item={each} />
                ))}
              </>
            </div>
            {data.length === 0 && <EmptyView />}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
