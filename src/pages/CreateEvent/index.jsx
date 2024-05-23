import React, { useState } from "react";
import "./index.css";

import categories from "../../constants/categoryList.json";
import locations from "../../constants/location.json";

import { Formik } from "formik";
import axios from "axios";

function CreateEvent() {
  const [location, setLocation] = useState("");
  const [errorlogs, setErrorlogs] = useState({});

  const seacrhLocation = async (e) => {
    try {
      // const GeoApi = `https://geocode.maps.co/search?q=${e.target.value}&api_key=663521e5dcd7e551552660zue4b616b`;

      const response = await axios.get(
        `https://geocode.maps.co/search?q=${"mahadevpur telangana"}&api_key=663521e5dcd7e551552660zue4b616b`
      );

      console.log(response);
    } catch (error) {}
  };

  return (
    <div className=" flex flex-col gap-3 p-3">
      <h1 className="text-3xl font-medium ">Create New Event</h1>
      <button onClick={seacrhLocation}>wdgqwu</button>
      <div className="py-3 flex flex-col gap-4 items-center">
        <Formik
          initialValues={{
            title: "",
            organizer: "",
            category: categories[0],
            description: "",
            date: "",
            time: "",
            address: "",
            amount: "",
            location: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.title) {
              errors.title = "Required*";
            }
            if (!values.description) {
              errors.description = "Required*";
            }
            if (!values.category) {
              errors.category = "Required*";
            }
            if (!values.organizer) {
              errors.organizer = "Required*";
            }

            if (!values.address) {
              errors.address = "Required*";
            }
            if (!values.date) {
              errors.date = "Required*";
            }
            if (!values.time) {
              errors.time = "Required*";
            }
            if (!values.location) {
              errors.location = "Required*";
            }

            return errors;
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleBlur,
            handleChange,
          }) => (
            <form
              onBlur={handleBlur}
              onChange={handleChange}
              onSubmit={handleSubmit}
              className="w-full rounded-lg  max-w-[570px]  p-5 cd  bg-white  text-gray-600 flex flex-col gap-2"
            >
              <p className="text-xl text-center font-bold md:font-semibold mb-1">
                Event Details
              </p>
              <div className="flex flex-col">
                <label htmlFor="title">Title of the Event</label>
                <input
                  id="title"
                  className=" input-stl"
                  placeholder="Title of the event"
                />{" "}
                <p className="text-[11px] text-red-600">
                  {(errors.title && touched.title && errors.title) ||
                    errorlogs.title}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className=" input-stl"
                  placeholder="About Event"
                />{" "}
                <p className="text-[11px] text-red-600">
                  {(errors.description &&
                    touched.description &&
                    errors.description) ||
                    errorlogs.description}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="organizer">Event Organizer</label>
                <input
                  id="organizer"
                  className=" input-stl"
                  placeholder="Enter the Organizer name"
                />{" "}
                <p className="text-[11px] text-red-600">
                  {(errors.organizer &&
                    touched.organizer &&
                    errors.organizer) ||
                    errorlogs.organizer}
                </p>
              </div>
              <div className="flex gap-3 ">
                <div className="flex flex-col flex-grow">
                  <label htmlFor="date">Event Date</label>
                  <input
                    type="date"
                    id="date"
                    className=" input-stl"
                    placeholder="Enter the Organizer name"
                  />{" "}
                  <p className="text-[11px] text-red-600">
                    {(errors.date && touched.date && errors.date) ||
                      errorlogs.date}
                  </p>
                </div>
                <div className="flex flex-col flex-grow ">
                  <label htmlFor="time">Event Time</label>
                  <input
                    type="time"
                    id="time"
                    className="input-stl"
                    placeholder="Enter the Organizer name"
                  />{" "}
                  <p className="text-[11px] text-red-600">
                    {(errors.time && touched.time && errors.time) ||
                      errorlogs.time}
                  </p>
                </div>{" "}
              </div>
              <div className="flex flex-col">
                <label htmlFor="category">Event Category</label>
                <select
                  defaultValue={categories[0]}
                  id="category"
                  className=" input-stl"
                  placeholder="Enter the Organizer name"
                >
                  {categories.map((e, i) => (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  ))}
                </select>{" "}
                <p className="text-[11px] text-red-600">
                  {(errors.category && touched.category && errors.category) ||
                    errorlogs.category}
                </p>
              </div>{" "}
              <div className="flex flex-col">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type=""
                  className=" input-stl"
                  placeholder="Area, Place, City, State"
                />{" "}
                <p className="text-[11px] text-red-600">
                  {(errors.address && touched.address && errors.address) ||
                    errorlogs.address}
                </p>
              </div>
              <div className="flex flex-col relative">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type=""
                  className=" input-stl"
                  placeholder="Select your location"
                />{" "}
                <ul className="z-10 rounded-md shadow-md p-1.5 text-xs ">
                  {locations.map((e, i) => (
                    <li
                      className="p-1 py-2 leading-4 hover:bg-slate-100"
                      key={i}
                    >
                      {e.display_name}
                    </li>
                  ))}
                </ul>
                {/* <p className="text-[11px] text-red-600">
                  {(errors.location && touched.location && errors.location) ||
                    errorlogs.location}
                </p> */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="amount">Entry Fee</label>
                <input
                  id="amount"
                  type="number"
                  className=" input-stl "
                  placeholder="In Rupees"
                />{" "}
                <p className="text-[11px] text-red-600">
                  {(errors.amount && touched.amount && errors.amount) ||
                    errorlogs.amount}
                </p>
              </div>
              <button
                type="submit"
                id="submit"
                className=" font-bold bg-btn-theme p-2.5 text-white mt-3"
              >
                Create
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateEvent;
