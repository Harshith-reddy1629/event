import React, { useState } from "react";

import ev from "../../assets/ev.png";
import "./index.css";

import categories from "../../constants/categoryList.json";
// import locations from "../../constants/location.json";

import { Formik } from "formik";
import axios from "axios";

import { ImCross } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../context/apiInstance";

function CreateEvent() {
  const [locationDetails, setLocationDetails] = useState({
    loc: "",
    touched: false,
    isActive: false,
    coords: [],
  });
  const [image, setImage] = useState("");
  const [i, setI] = useState("");
  const [imageStat, setImageStat] = useState("initial");
  const [imagePrev, setImageprev] = useState("");

  const [searchLocs, setLocs] = useState([]);

  const [errorlogs, setErrorlogs] = useState({});

  const [status, setStatus] = useState("initial");

  const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const searchLocation = async (e) => {
    try {
      setLocationDetails((prevState) => ({ ...prevState, touched: true }));
      const value = e.target.value ?? "";
      if (value.trim().length > 3) {
        setErrorlogs((state) => ({
          ...state,
          location: "",
        }));

        console.log("Executing API call...");
        const response = await axios.get(
          `https://geocode.maps.co/search?q=${value.trim()}&api_key=663521e5dcd7e551552660zue4b616b`
        );
        console.log(response.data);
        if (response.data.length === 0) {
          setErrorlogs((state) => ({
            ...state,
            location: "No locations found with this value",
          }));
        }
        setLocs(response.data);
      } else {
        setErrorlogs((state) => ({
          ...state,
          location: "Search with at least 4 Characters",
        }));
      }
    } catch (error) {
      setErrorlogs((state) => ({
        ...state,
        location: "Something went wrong, check internet.",
      }));
    }
  };
  const searchdelay = debounce(searchLocation, 1300);

  const uploadPreview = (e) => {
    setImage("");
    setImageStat("initial");
    setI(e.target.files[0]);
    setImageprev(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = async () => {
    try {
      setImageStat("uploading");

      const formData = new FormData();
      formData.append("file", i);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      let response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_API,
        formData
      );
      setImage(response.data.secure_url);
      setImageStat("success");
    } catch (error) {
      setImageStat("failed");
      setErrorlogs((prev) => ({
        ...prev,
        image: error.message,
      }));
      console.log(error);
    }
  };

  const SubmitEvent = async (values, setSubmitting, resetForm) => {
    if (!locationDetails.loc || locationDetails.coords.length !== 2) {
      setErrorlogs({
        ...errorlogs,
        location: "This is mandatory field",
      });
    } else if (!image) {
      setErrorlogs({
        ...errorlogs,
        image: "Image is Required",
      });
    } else {
      try {
        const response = await api.post("/events/", {
          ...values,
          location: locationDetails,
          image,
        });
        console.log(response);
        toast.success("Created");
        // resetForm();
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    }

    // console.log({ ...values, location: locationDetails });
  };

  return (
    <div className=" flex flex-col gap-3 p-3">
      <h1 className="text-3xl font-medium ">Create New Event</h1>
      <div className="py-3 flex flex-col gap-4 items-center">
        <ToastContainer />
        <Formik
          initialValues={{
            title: "",
            organizer: "",

            category: categories[0],
            description: "",
            date: "",
            time: "",
            location: "",
            coords: [],
            address: "",
            amount: "",
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
            if (!values.amount) {
              errors.amount = "Required*";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            SubmitEvent(values, setSubmitting, resetForm);
            resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleBlur,
            handleChange,
            isSubmitting,
            resetForm,
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
              </div>{" "}
              <div className="flex flex-col gap-1">
                <label>Image</label>

                <div className="flex gap-2  items-center">
                  <img
                    src={imagePrev || ev}
                    className="h-[100px] bg-gray-100 rounded border p-1 w-[150px] object-contain"
                    alt="."
                  />
                  <div className="flex flex-col ">
                    {errorlogs.image && (
                      <p className="text-[11px] text-red-600">
                        {errorlogs.image}
                      </p>
                    )}

                    <input
                      id="image"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="w-fit rounded-md p-2 border"
                      onChange={uploadPreview}
                    />
                  </div>
                </div>
                <button
                  id="bn"
                  onClick={uploadImage}
                  disabled={!imagePrev}
                  type="button"
                  className="bg-[#049769] w-fit text-sm px-4  p-1 text-white disabled:bg-gray-100 disabled:text-gray-600"
                >
                  {imageStat === "success" && "Confirmed"}
                  {imageStat === "initial" && "Confirm"}
                  {imageStat === "uploading" && "Uploading"}
                  {imageStat === "failed" && "Failed"}
                </button>
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
              <div className="flex flex-col relative group">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="location">Location</label>

                  <p className="text-[11px]  text-red-600">
                    {locationDetails.touched && errorlogs.location}
                  </p>
                </div>
                {locationDetails.loc ? (
                  <div className="p-1.5 border border-gray-200 flex gap-2 items-center group/item justify-between px-3  relative ">
                    {" "}
                    <p className="text-xs p-1.5   px-3 bg-gray-200 flex-grow whitespace-nowrap overflow-hidden text-ellipsis rounded-full">
                      {" "}
                      {locationDetails.loc}
                    </p>
                    <button
                      onClick={() =>
                        setLocationDetails((prevState) => ({
                          ...prevState,
                          loc: "",
                          coords: [],
                        }))
                      }
                      className="bg-gray-400   hover:bg-gray-500 flex justify-center items-center  text-[10px] p-1  text-white rounded-full"
                    >
                      <ImCross size={6} />
                    </button>
                  </div>
                ) : (
                  <>
                    {" "}
                    <input
                      id="location1"
                      onChange={searchdelay}
                      onFocus={() =>
                        setLocationDetails((prevState) => ({
                          ...prevState,
                          isActive: true,
                        }))
                      }
                      type="search"
                      className=" input-stl peer"
                      placeholder="Select your location"
                    />{" "}
                    {locationDetails.isActive && (
                      <ul className="z-10 rounded-md  shadow-md p-1.5 text-xs max-h-48 overflow-y-auto ">
                        {searchLocs.length === 0 && (
                          <p className="text-gray-400 text-center text-base">
                            No Search Results
                          </p>
                        )}
                        {searchLocs.map((e, i) => (
                          <li
                            className="p-1 py-2 leading-4 hover:bg-slate-100"
                            key={i}
                            onClick={() => {
                              console.log(e.display_name);
                              setLocationDetails((prevState) => ({
                                ...prevState,
                                loc: e.display_name,
                                coords: [e.lon, e.lat],
                              }));
                              console.log("location", locationDetails);
                            }}
                          >
                            {e.display_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="amount">Entry Fee</label>

                <input
                  id="amount"
                  type="number"
                  className=" input-stl "
                  placeholder="In Rupees"
                />
                <p className="text-[11px] text-red-600">
                  {(errors.amount && touched.amount && errors.amount) ||
                    errorlogs.amount}
                </p>
              </div>
              <button
                type="submit"
                id="submit"
                disabled={isSubmitting}
                className=" font-bold bg-btn-theme p-2.5 text-white mt-3 disabled:bg-btn-theme-500"
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
