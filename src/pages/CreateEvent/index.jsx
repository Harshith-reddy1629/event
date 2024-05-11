import React from "react";
import "./index.css";

function CreateEvent() {
  return (
    <div className=" flex flex-col gap-3">
      <h1 className="text-4xl font-medium ">Create New Event</h1>
      <div className="py-3 flex flex-col gap-4 items-center">
        <p className="text-xl font-semibold">Event Details</p>
        <form className="w-full rounded-lg  max-w-[570px]  p-5 cd  bg-white  text-gray-600 flex flex-col gap-2">
          <div className="flex flex-col">
            <label>Title of the Event</label>
            <input className=" input-stl" placeholder="Title of the event" />
          </div>
          <div className="flex flex-col">
            <label>Description</label>
            <textarea
              rows={3}
              className=" input-stl"
              placeholder="About Event"
            />
          </div>
          <div className="flex flex-col">
            <label>Event Organizer</label>
            <input
              className=" input-stl"
              placeholder="Enter the Organizer name"
            />
          </div>
          <div className="flex gap-3 ">
            <div className="flex flex-col flex-grow">
              <label>Event Date</label>
              <input
                type="date"
                className=" input-stl"
                placeholder="Enter the Organizer name"
              />
            </div>
            <div className="flex flex-col flex-grow ">
              <label>Event Time</label>
              <input
                type="time"
                className="input-stl"
                placeholder="Enter the Organizer name"
              />
            </div>{" "}
          </div>
          <div className="flex flex-col">
            <label>Event Category</label>
            <select
              className=" input-stl"
              placeholder="Enter the Organizer name"
            >
              <option>Tech</option>
              <option>Dance</option>
              <option>Fest</option>
              <option>Sports</option>
              <option>Conference</option>
              <option>Party</option>
            </select>
          </div>{" "}
          <div className="flex flex-col">
            <label>Address</label>
            <input
              type=""
              className=" input-stl"
              placeholder="Area, Place, City, State"
            />
          </div>
          <div className="flex flex-col">
            <label>Entry Fee</label>
            <input
              type="number"
              className=" input-stl "
              placeholder="In Rupees"
            />
          </div>
          <button className=" font-bold bg-btn-theme p-2.5 text-white mt-3">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
