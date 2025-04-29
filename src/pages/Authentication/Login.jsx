import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const initialValues = { email: "", password: "" };
const validationSchema = {
  email: Yup.string().email("Invalid email").required("email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required"),
};
const Login = () => {
  const [formValues, setFormValues] = useState();
  const handleSubmit = (values) => {
    console.log("handleSubmit", values);
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
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
                className="border border-gray-300 p-2 rounded-md"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Field
                as={TextField}
                type="password"
                name="password"
                placeholder="Password"
                className="border border-gray-300 p-2 rounded-md"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
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
    </>
  );
};

export default Login;
