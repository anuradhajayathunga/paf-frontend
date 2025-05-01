import { TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUserAction } from "../../Redux/Auth/auth.action";
import { getAllPostAction } from "../../Redux/Post/post.action";

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

  const { loading, error, jwt } = useSelector((state) => state.auth);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      navigate("/home");
    }
  }, [jwt, navigate]);

  const handleSubmit = async (values) => {
    console.log("handleSubmit", values);
    const success = await dispatch(loginUserAction(values));
    if (success) {
      // Redirect will happen automatically due to the useEffect above
      // But we can force it here for immediate feedback
      navigate("/home");
    }
  };


  return (
    <>
      <h2 className="font-bold font-chivo text-[40px] leading-[30px] md:text-heading-3 mb-[50px]">
        Welcome back.
      </h2>
      <button type="button">
        <div className="flex items-center z-10 relative transition-all duration-200 group py-[13px] md:px-[120px] px-[80px] rounded-md bg-white text-gray-500 hover:text-gray-900 flex-row-reverse w-fit mb-[30px]">
          <span className="block text-inherit w-full h-full rounded-md text-md font-chivo font-semibold">
            Sign In with Google
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
            {loading ? "Loggin..." : "Login"}
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
