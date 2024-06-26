import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import api from "../../context/apiInstance";
import axios from "axios";
import Resend from "./components/Resend";
import Cookies from "js-cookie";
import { BiLoaderAlt } from "react-icons/bi";
function Login() {
  const [statusCode, setStatusCode] = useState(0);

  const navigate = useNavigate();

  const [errorlogs, setErrorlogs] = useState("");

  const mailRef = useRef(0);

  const onSuccess = (result) => {
    Cookies.set("token", result, {
      expires: 30,
      path: "/",
    });

    navigate("/", { replace: true });
  };

  const handleFocuses = (e) => {
    setErrorlogs({ ...errorlogs, [e.target.id]: "" });
  };
  const closeError = () => setStatusCode("");
  const submitForm = async (values) => {
    try {
      const response = await api.post("/user/login", values);
      onSuccess(response.data.token);
    } catch (error) {
      const { status } = error.response;
      if (status === 403) {
        setStatusCode(403);
      }
      setErrorlogs(error.response.data);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) errors.email = "Required*";

          if (!values.password) errors.password = "Required*";
          if (values.password) {
            if (values.password.length > 16 || values.password.length < 8)
              errors.password = "password length should be 8-16";
          }
          return errors;
        }}
        onSubmit={(values) => submitForm(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            className="bg-white rounded-md shadow-md max-w-[400px] w-full flex flex-col gap-2 p-3  "
          >
            <h2 className="my-3 text-center text-2xl font-semibold ">LOGIN</h2>
            {statusCode === 403 && (
              <Resend closeError={closeError} ref={mailRef} />
            )}
            <div className="flex flex-col gap-0.5 ">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                ref={mailRef}
                type="email"
                placeholder="Enter Email"
                onFocus={handleFocuses}
                className="p-2 bg-gray-200 outline-none"
              />{" "}
              <p className="error-text">
                {(errors.email && touched.email && errors.email) ||
                  errorlogs.email}
              </p>
            </div>
            <div className="flex flex-col gap-0.5 ">
              <label htmlFor="password">Password</label>
              <input
                onFocus={handleFocuses}
                id="password"
                type="password"
                placeholder="Enter your password"
                className="p-2 bg-gray-200  outline-none"
              />
              <p className="error-text">
                {(errors.password && touched.password && errors.password) ||
                  errorlogs.password}
              </p>
            </div>
            <button
              id="submit-btn"
              name="submit-btn"
              type="submit"
              disabled={isSubmitting}
              className={`p-2 mt-3 bg-btn-theme disabled:bg-btn-theme-800 text-white text-center font-medium`}
            >
              {isSubmitting ? (
                <BiLoaderAlt className="mx-auto text-xl animate-spin" />
              ) : (
                "Login"
              )}
            </button>
            <p className="text-xs text-blue-700 hover:underline">
              Forgot Password
            </p>
            <p className="text-xs text-center">
              Don't have an Account?{" "}
              <Link to="/register" className="text-blue-700 hover:underline ">
                {" "}
                Register
              </Link>{" "}
            </p>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Login;
