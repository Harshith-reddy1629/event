import { useState } from "react";

import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import CheckAuth from "./pages/CheckAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification.jsx";
import NotFound from "./pages/NotFound/index.jsx";

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
      <Route path="/verification/:id" element={<Verification />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}

export default App;
