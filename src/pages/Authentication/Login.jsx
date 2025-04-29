import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUserAction } from "../../Redux/Auth/auth.action";

const initialValues = { email: "", password: "" };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("handleSubmit", values);
    dispatch(loginUserAction(values));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-5">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-sm text-gray-500">
              Welcome back! Please enter your details.
            </p>
          </div>

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

          <Button
            type="submit"
            variant="contained"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </Button>
        </Form>
      </Formik>

      <div>
        <p className="text-sm text-gray-500 mt-5">
          If you don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {" "}Register
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
