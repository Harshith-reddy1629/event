import React from "react";
import thumbnail from "../assets/thumbnail.jpg";
import thumbnail1 from "../assets/party.jpg";

import "./eventcard.css";
import { MdLocationOn } from "react-icons/md";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function EventCard({ item }) {
  const d = new Date(item.date).toString();

  console.log(d);
  console.log(d);

  return (
    <div className="flex gap-2 relative">
      {/* <div className=""> */}
      <img
        src={thumbnail}
        className="w-[40%] bg-gray-400  aspect-[2/1.1] overflow-hidden  flex-shrink-0 object-contain"
        alt="."
      />
      {/* </div> */}
      <div className="flex-grow">
        <h1 className="font-medium text-lg leading-5 text-gray-800">
          {item.title}
        </h1>
        <div className=" el mt-1   ">
          <p className="text-xs text-gray-600 ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960
          </p>
        </div>

        <p className="bg-slate-700 text-white font-semibold rounded-br-md shadow inline-block p-1 px-2 text-xs absolute top-0 left-0    ">
          {d.slice(0, 3)} {d.slice(8, 10)} {d.slice(4, 7)}
        </p>
        <p className="bg-btn-theme text-white font-semibold rounded-md shadow inline-block p-1 px-2 text-[10px] absolute top-7 left-0.5    ">
          {item.time}
        </p>
        <p className="bg-btn-theme text-white font-semibold rounded-md shadow inline-block p-1 px-2  text-xs absolute bottom-1 left-0.5    ">
          Free
        </p>
        <p className="text-xs font-medium flex gap-0.5 mt-1 items-center">
          <MdLocationOn /> {item.address}
        </p>
        <button className="bg-btn-theme text-white p-1 mt-1 shadow px-5">
          Book
        </button>
      </div>
    </div>
  );
}

export default EventCard;
