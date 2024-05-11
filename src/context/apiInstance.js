import axios from "axios";

const api = axios.create({
  baseURL: "https://event-be.vercel.app",
  headers: {},
});

export default api;
