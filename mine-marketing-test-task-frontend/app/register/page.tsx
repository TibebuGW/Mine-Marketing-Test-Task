"use client";
import axios, { AxiosError } from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Spinner from "../components/spinner/spinner";
export const Signup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<String>("");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.BASE_URL}auth/register`,
        values
      );
      
      console.log("success")
      if (response?.data?.success) {
        
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data?.message;
        setRegisterError(errorMessage);
      }
    }

    setLoading(false);
  };

  return (
    <div className="font-primaryFont font-bold bg-gradient-to-r from-blue-purple-0 to-blue-purple-100 h-screen flex items-center justify-center">
      <div className="w-30p">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="py-3 px-10 overflow-y-auto rounded-2xl shadow-md box-border bg-[#d6dce9]">
            {registerError != "" && (
              <p className="px-4 py-4 mt-4 flex bg-red text-white rounded-md">
                <span className="pt-1 pr-5">
                  <AiFillWarning />
                </span>
                <span className="pa-0">{registerError}</span>
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 my-2">
              <div className="my-2">
                <label className="block my-2 text-black">First Name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium text-black"
                  placeholder="First name"
                  type="text"
                />
                <ErrorMessage
                  className="text-red"
                  name="firstName"
                  component="div"
                />
              </div>
              <div className="my-2">
                <label className="block my-2 text-black">Second Name</label>
                <Field
                  id="lastName"
                  name="lastName"
                  className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium text-black"
                  placeholder="Second name"
                  type="text"
                />
                <ErrorMessage
                  className="text-red"
                  name="lastName"
                  component="div"
                />
              </div>
            </div>
            <div className="my-2">
              <label className="block my-2 text-black">Email</label>
              <Field
                id="email"
                name="email"
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium text-black"
                placeholder="Email"
                type="email"
              />
              <ErrorMessage className="text-red" name="email" component="div" />
            </div>
            <div className="my-2">
              <label className="block my-2 text-black">Password</label>
              <Field
                id="password"
                name="password"
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium text-black"
                placeholder="Password"
                type="password"
              />
              <ErrorMessage
                className="text-red"
                name="password"
                component="div"
              />
            </div>
            <div className="my-2">
              <label className="block my-2 text-black">Confirm Password</label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium text-black"
                placeholder="Confirm password"
                type="password"
              />
              <ErrorMessage
                className="text-red"
                name="confirmPassword"
                component="div"
              />
            </div>
            <button
              type="submit"
              className={`py-2 px-5 my-3 text-secondary rounded-md w-full bg-lightPrimary  ${!loading ?  'hover:bg-darkPrimary': ''}`}
              disabled={loading}
            >
              {
                loading ? 
                <Spinner />
                :
                <h1>Register</h1>
              } 
            </button>
            <p className="my-3 text-center text-black">
              Already have an account?{" "}
              <Link href="/login">
                <span className="text-blue">Login</span>
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;