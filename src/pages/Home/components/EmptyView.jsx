import React from "react";

import { MdEventBusy, MdOutlineEventBusy } from "react-icons/md";

function EmptyView() {
  return (
    <div className="flex flex-col justify-center items-center  ">
      <MdOutlineEventBusy size={140} className="text-gray-700" />
      <p>No Events in this location</p>
    </div>
  );
}

export default EmptyView;
