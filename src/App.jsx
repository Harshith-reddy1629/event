import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import CheckAuth from "./pages/CheckAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route element={<CheckAuth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Route>
    </Routes>
  );
}

export default App;
