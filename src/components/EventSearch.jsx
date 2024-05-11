import React from "react";

function EventSearch() {
  return (
    <div className="border w-[300px] rounded overflow-hidden">
      <input
        type="search"
        className="p-1 px-2 w-full outline-none text-sm "
        placeholder="Search by event name "
      />
    </div>
  );
}

export default EventSearch;
