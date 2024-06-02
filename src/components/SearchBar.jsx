import axios from "axios";
import React, { useState, forwardRef } from "react";
import { MdLocationOn } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../store/slice.js";

function SearchBar() {
  const [coordinates, setCoordinates] = useState({});
  const [selected, setSelected] = useState("");
  const [loc, setLocs] = useState([]);
  const [dropdownStat, setDropDown] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
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
      setCoordinates((prevState) => ({ ...prevState, touched: true }));
      const value = e.target.value ?? "";
      if (value.trim().length > 3) {
        setError("");

        console.log("Executing API call...");
        const response = await axios.get(
          `https://geocode.maps.co/search?q=${value.trim()}&api_key=663521e5dcd7e551552660zue4b616b`
        );
        console.log(response.data);
        if (response.data.length === 0) {
          setError("No locations found with this value");
        }
        setLocs(response.data);
      } else {
        console.log(" kkk");
        setError("Search with at least 4 Characters");
      }
    } catch (error) {
      console.log(error.message);
      setError("Something went wrong");
    }
  };
  const searchdelay = debounce(searchLocation, 1300);

  return (
    <form
      action="#"
      onSubmit={(e) => e.preventDefault()}
      className="flex justify-center relative"
    >
      <div className="flex items-center bg-white shadow-md max-w-[600px] mt-3  w-full relative">
        {" "}
        {error && (
          <p className="bottom-full  text-red-600 bg-red-200 px-1  z-10 rounded text-[10px] absolute left-0">
            {error}
          </p>
        )}
        <MdLocationOn className="p-1 pl-2  pr-0 box-content text-2xl text-gray-600 shrink-0" />
        <input
          type="search"
          value={selected}
          onChange={(e) => {
            searchdelay(e);
            setSelected(e.target.value);
            if (e.target.value.length <= 4) {
              setDropDown(false);
            } else {
              setDropDown(true);
            }
          }}
          className="p-2.5 grow px-2 outline-none text-sm md:text-base "
          placeholder="Search by place and city name "
        />
        <button className="font-semibold  h-full bg-btn-theme text-white p-1 px-2 !leading-4 text-sm md:text-base">
          Search Events
        </button>{" "}
        {dropdownStat && loc.length !== 0 && (
          <ul className="absolute bg-white mt-0.5 rounded shadow-lg  p-1 w-full z-20 top-full left-0">
            {loc.map((e) => (
              <li
                key={e.display_name}
                onClick={() => {
                  setSelected(e.display_name);
                  setDropDown(false);
                  dispatch(fetchEvents({ lat: e.lat, long: e.lon }));
                }}
                className="hover:bg-slate-100 text-sm rounded-md p-1 px-2 whitespace-nowrap text-ellipsis overflow-hidden"
              >
                {e.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

const fr = forwardRef(SearchBar);

export default fr;
