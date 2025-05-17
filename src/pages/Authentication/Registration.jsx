import { TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUserAction } from "../../Redux/Auth/auth.action";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  fname: Yup.string().required("First name is required"),
  // lname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character."
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("handleSubmit", values);
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = values;
      const success = dispatch(registerUserAction(userData));
      if (success) {
        navigate("/login");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong during registration.");
    }
  };

  // Initialize Google login
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post("http://localhost:8080/api/auth/google", {
          token: tokenResponse.credential || tokenResponse.access_token,
        });

        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } catch (err) {
        console.error("Google login error:", err);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  return (
    <>
      <h2 className="font-bold font-chivo text-[40px] leading-[30px] md:text-heading-3 mb-[50px]">
        Let's join us
      </h2>
      <button type="button" onClick={() => login()}>
        <div className="flex items-center z-10 relative transition-all duration-200 group py-[13px] md:px-[120px] px-[80px] rounded-md bg-white text-gray-500 hover:text-gray-900 flex-row-reverse w-fit mb-[30px]">
          <span className="block text-inherit w-full h-full rounded-md text-md font-chivo font-semibold">
            Sign Up with Google
          </span>
          <img
            className="mr-5"
            src="assets/images/icons/Icon-google.svg"
            alt="google icon"
          />
        </div>
      </button>
      <div className="flex items-center justify-center gap-[7px] mb-[25px]">
        <div className="bg-gray-300 w-[50px] h-[2px]"></div>
        <p className="text-text text-gray-500">Or, sign up with email</p>
        <div className="bg-gray-300 w-[50px] h-[2px]"></div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white w-full p-8 shadow-3 rounded-[6px] md:p-12">
            <div className="">
              <div className="relative mb-6">
                <Field
                  as={TextField}
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  variant="outlined"
                  fullWidth
                  className="outline-none flex-1 pr-10 border caret-blue-900 w-full peer placeholder:text-gray-400 placeholder:text-text placeholder:font-chivo border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-blue-900 focus:border-[2px]"
                />
                <ErrorMessage
                  name="fname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {/* <div className="relative mb-6">
                <Field
                  as={TextField}
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  variant="outlined"
                  fullWidth
                  className="outline-none flex-1 pr-10 border caret-blue-900 w-full peer placeholder:text-gray-400 placeholder:text-text placeholder:font-chivo border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-blue-900 focus:border-[2px]"
                />
                <ErrorMessage
                  name="lname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div> */}
              <div className="relative mb-6">
                <Field
                  as={TextField}
                  type="email"
                  name="email"
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                  className="outline-none flex-1 pr-10 border caret-blue-900 w-full peer placeholder:text-gray-400 placeholder:text-text placeholder:font-chivo border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-blue-900 focus:border-[2px]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="relative mb-6">
                <Field
                  as={TextField}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  variant="outlined"
                  fullWidth
                  className="outline-none flex-1 pr-10 border caret-blue-900 w-full peer placeholder:text-gray-400 placeholder:text-text placeholder:font-chivo border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-blue-900 focus:border-[2px]"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-[12px] transform -translate-y-1/2 text-gray-500 hover:text-blue-900"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </button>
              </div>
              <div className="relative mb-6">
                <Field
                  as={TextField}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  variant="outlined"
                  fullWidth
                  className="outline-none flex-1 pr-10 border caret-blue-900 w-full peer placeholder:text-gray-400 placeholder:text-text placeholder:font-chivo border-[#C2C8D0] rounded-[4px] py-[14px] pl-[16px] focus:border-blue-900 focus:border-[2px]"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-[12px] transform -translate-y-1/2 text-gray-500 hover:text-blue-900"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </button>
              </div>
            </div>
            <button
              className="mb-6 w-full text-white bg-blue-900 transition-opacity duration-200 text-heading-6 font-chivo font-bold shadow-sm py-[13px] hover:opacity-75"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Sign up"}
            </button>
            <div className="flex gap-2">
              <p className="text-text text-gray-500">
                Already have an account?
              </p>
              <div
                className="text-blue-900 hover:opacity-70 hover:cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <p className="text-text">Sign in</p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Registration;
