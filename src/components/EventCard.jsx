import React from "react";
import thumbnail from "../assets/thumbnail.jpg";
import thumbnail1 from "../assets/party.jpg";
import Cookies from "js-cookie";
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
  const token = Cookies.get("token");

  const HandlePayment = async (e) => {
    const response = await fetch(
      `https://event-be.vercel.app/events/order/${item._id}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const order = await response.json();

    var options = {
      key: import.meta.env.VITE_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "EVENT BOOKING",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
          eventID: item._id,
        };
        const res = await fetch(
          `https://event-be.vercel.app/events/order/verify/validate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlZGR5YmhhcnNoaXRoM0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6IkhhcnNoaXRoMTYyOSIsIm5hbWUiOiJIYXJzaGl0aCBCYW5kYW0iLCJfaWQiOiI2NjQwNjRiZGQ2ODdiMjE1YzZlODI4ZjkiLCJpYXQiOjE3MTY2NDY5NzB9.c7QgwcGgOrw9Ms8WSBUHdTI3qGLw1-mtZBnUD1bGMA8",
            },
            body: JSON.stringify(body),
          }
        );
        const o = await res.json();
      },
      prefill: {
        name: order.notes[0],
        email: order.notes[2],
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert("Something went wrong");
    });

    rzp1.open();
    e.preventDefault();
  };

  return (
    <div className="p-1">
      <div className="flex gap-2 relative ">
        {/* <div className=""> */}
        <img
          src={item.image}
          className="w-[40%] bg-gray-400  aspect-[2/1.1] overflow-hidden  flex-shrink-0 object-contain"
          alt="."
        />
        {/* </div> */}
        <div className="flex-grow flex flex-col justify-between py-1 ">
          <div>
            <h1 className="font-medium text-lg leading-5 text-gray-800">
              {item.title}
            </h1>
            <div className=" el mt-1   ">
              <p className="text-xs text-gray-600 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                eget quam nec est tincidunt dapibus nec ac justo. Sed nec lacus
                eu libero fermentum tincidunt vel at lacus. Phasellus vitae quam
                nec nisi gravida fermentum. Integer condimentum leo non finibus
                commodo. Donec rhoncus nisl vel luctus pretium. Nam eu semper
                velit. Vivamus vitae felis quis tortor scelerisque vestibulum.
                Duis id enim ut elit accumsan tincidunt. Morbi pharetra orci sed
                est posuere, at tristique
              </p>
            </div>
          </div>

          <p className="bg-slate-700 text-white font-semibold rounded-br-md shadow inline-block p-1 px-2 text-xs absolute top-0 left-0    ">
            {d.slice(0, 3)} {d.slice(8, 10)} {d.slice(4, 7)}
          </p>
          <p className="bg-btn-theme text-white font-semibold rounded-md shadow inline-block p-1 px-2 text-[10px] absolute top-7 left-0.5    ">
            {item.time}
          </p>
          <p className="bg-btn-theme text-white font-semibold rounded-md shadow inline-block p-1 px-2  text-xs absolute bottom-1 left-0.5    ">
            {item.price === 0 ? `Free` : `${item.price} RS`}
          </p>
          <div>
            <p className="text-xs font-medium flex gap-0.5 mt-1 items-center">
              <MdLocationOn /> {item.address}
            </p>
            <button
              id="rzr-btn"
              onClick={HandlePayment}
              className="bg-btn-theme text-white p-1 mt-1 shadow px-5"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
