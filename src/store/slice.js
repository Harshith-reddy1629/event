import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../context/apiInstance";

const initialState = {
  data: [],
  status: "initial",
  error: "",
};
// "Content-Type": "application/json"
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (payload, thunkApi) => {
    try {
      const { lat, long } = payload;
      const response = await api.get(
        `/events/search-by-cords?lat=${lat}&long=${long}`
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const Events = createSlice({
  name: "events",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.data = action.payload;

        state.status = "success";

        state.error = "";
      })
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.error = action.payload;

        state.status = "error";
      });
  },
});

export default Events.reducer;
