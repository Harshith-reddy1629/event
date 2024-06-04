import axios from "axios";

import Cookies from "js-cookie";

const token = Cookies.get("token");

const api = axios.create({
  baseURL: "https://event-be.vercel.app",

  headers: {
    authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  function (response) {
    console.log("Request Successful");

    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      Cookies.remove("token");
      console.log("invalid user");
      window.location.replace("/login");
    }
  }
);

export default api;
