import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../context/apiInstance";
import { MdMarkEmailRead } from "react-icons/md";
import Resend from "./components/Resend";
import { BiLoaderAlt } from "react-icons/bi";
function Register() {
  const [errorlogs, setErrorlogs] = useState("");

  const [isReg, setReg] = useState(false);

  const mailRef = useRef(0);

  const handleFocuses = (e) => {
    setErrorlogs({ ...errorlogs, [e.target.id]: "" });
  };

  const submitForm = async (values, setSubmitting) => {
    try {
      const response = await api.post("/user/register-user", values);
      setReg(true);
    } catch (error) {
      const { status } = error.response;

      setErrorlogs(error.response.data);
      setSubmitting(false);
    }
  };

  return (
    <>
      {" "}
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required*";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.username) errors.username = "Required*";
          if (!values.name) errors.name = "Required*";
          if (!values.password) {
            errors.password = "Required*";
          } else if (8 > values.password.length) {
            errors.password = "Minimum 8 characters";
          } else if (16 < values.password.length) {
            errors.password = "Maximum 16 characters";
          }
          if (!values.confirmpassword) {
            errors.confirmpassword = "Required*";
          } else if (values.password !== values.confirmpassword) {
            errors.confirmpassword = "Password is not matching";
          }
          return errors;
        }}
        // onSubmit={(values) => SubmitForm(values)}
        onSubmit={(values, { setSubmitting }) => {
          submitForm(values, setSubmitting);
        }}
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
            onFocus={handleFocuses}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            className="bg-white rounded-md shadow-md relative max-w-[400px] overflow-hidden w-full min-w-[320px] flex flex-col gap-1.5 p-3  "
          >
            <h2 className="my-2 text-center text-2xl font-medium">Register</h2>
            <div className="flex flex-col gap-0.5 ">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                placeholder="Enter your name"
                className="p-2 bg-gray-200 outline-none"
              />
              <p className="text-[11px] text-red-600">
                {(errors.name && touched.name && errors.name) || errorlogs.name}
              </p>
            </div>
            <div className="flex flex-col gap-0.5 ">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                placeholder="Enter your username"
                className="p-2 bg-gray-200 outline-none"
              />
              <p className="text-[11px] text-red-600">
                {(errors.username && touched.username && errors.username) ||
                  errorlogs.username}
              </p>
            </div>
            <div className="flex flex-col gap-0.5 ">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                ref={mailRef}
                placeholder="Enter Email"
                className="p-2 bg-gray-200 outline-none"
              />
              <p className="text-[11px] text-red-600">
                {(errors.email && touched.email && errors.email) ||
                  errorlogs.email}
              </p>
            </div>

            <div className="flex flex-col gap-0.5 ">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="p-2 bg-gray-200  outline-none"
              />
              <p className="text-[11px] text-red-600">
                {(errors.password && touched.password && errors.password) ||
                  errorlogs.password}
              </p>
            </div>
            <div className="flex flex-col gap-0.5 ">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                id="confirmpassword"
                type="password"
                placeholder="Confirm your password"
                className="p-2 bg-gray-200  outline-none"
              />
              <p className="text-[11px] text-red-600">
                {errors.confirmpassword &&
                  touched.confirmpassword &&
                  errors.confirmpassword}
              </p>
            </div>
            <button
              id="register"
              name="register"
              type="submit"
              disabled={isSubmitting}
              className="p-2 mt-3 bg-btn-theme disabled:bg-btn-theme-700  text-white font-medium"
            >
              {isSubmitting ? (
                <BiLoaderAlt className="mx-auto text-xl animate-spin" />
              ) : (
                "Register"
              )}
            </button>
            <p className="text-xs text-center">
              Already have an Account?{" "}
              <Link to="/login" className="text-blue-700">
                {" "}
                Login
              </Link>{" "}
            </p>
            {isReg && (
              <div className="bg-white absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center gap-2 p-3 text-center">
                <Resend ref={mailRef} />
              </div>
            )}
          </form>
        )}
      </Formik>
    </>
  );
}

export default Register;
