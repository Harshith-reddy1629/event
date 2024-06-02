import { configureStore } from "@reduxjs/toolkit";
import eventReducers from "./slice.js";
const store = configureStore({
  reducer: {
    events: eventReducers,
  },
});

export default store;
