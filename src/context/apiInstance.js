import axios from "axios";

import Cookies from "js-cookie";

const token = Cookies.get("token");

const api = axios.create({
  baseURL: "https://event-be.vercel.app",
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default api;
