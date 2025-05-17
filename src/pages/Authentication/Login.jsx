import { TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUserAction } from "../../Redux/Auth/auth.action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";
import { api } from "../../config/api"; // ✅ Using centralized Axios instance

const initialValues = { email: "", password: "" };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters.")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    try {
      const success = await dispatch(loginUserAction(values));
      if (success) {
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong during login.");
    }
  };

  // ✅ Google Login using centralized api instance
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/api/auth/google", {
          token: tokenResponse.credential || tokenResponse.access_token,
        });

        localStorage.setItem("token", res.data.token);
        toast.success("Google login successful!");
        navigate("/dashboard");
      } catch (err) {
        toast.error("Google login failed.");
        console.error("Google login error:", err);
      }
    },
    onError: () => {
      toast.error("Google login failed.");
      console.error("Google login failed");
    },
  });

  return (
    <>
      <h2 className="font-bold font-chivo text-[40px] leading-[30px] md:text-heading-3 mb-[50px]">
        Welcome back.
      </h2>

      <button type="button" onClick={() => login()}>
        <div className="flex items-center z-10 relative transition-all duration-200 group py-[13px] md:px-[120px] px-[80px] rounded-md bg-white text-gray-500 hover:text-gray-900 flex-row-reverse w-fit mb-[30px]">
          <span className="block text-inherit w-full h-full rounded-md text-md font-chivo font-semibold">
            Sign In with Google
          </span>
          <img
            className="mr-5"
            src="/assets/images/icons/Icon-google.svg"
            alt="google icon"
          />
        </div>
      </button>

      <div className="flex items-center justify-center gap-[7px] mb-[25px]">
        <div className="bg-gray-300 w-[50px] h-[2px]"></div>
        <p className="text-text text-gray-500">Or, sign in with your email</p>
        <div className="bg-gray-300 w-[50px] h-[2px]"></div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white w-full p-8 shadow-3 rounded-[6px] md:p-12">
          <div className="flex flex-col space-y-5">
            <div>
              <Field
                as={TextField}
                type="email"
                name="email"
                placeholder="Email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                as={TextField}
                type="password"
                name="password"
                placeholder="Password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div className="block w-fit ml-auto mt-1 mb-5">
            <div className="text-sm font-bold text-gray-500 hover:underline hover:text-c-blue-900">
              Forgot password?
            </div>
          </div>

          <button
            className="mb-6 w-full text-white bg-c-blue-900 transition-opacity duration-200 text-heading-6 font-chivo font-bold shadow-sm py-[13px] hover:opacity-75"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex gap-2">
            <p className="text-text text-gray-500">Don't have an account?</p>
            <div
              className="text-c-blue-900 hover:opacity-70 hover:cursor-pointer"
              onClick={() => navigate("/register")}
            >
              <p className="text-text">Sign up</p>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
