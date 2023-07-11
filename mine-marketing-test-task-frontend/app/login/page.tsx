"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import * as Yup from "yup";
import { AiFillWarning } from "react-icons/ai";
import Spinner from "../components/spinner/spinner";
import { redirect } from "next/navigation";
export default function Login(){
  const { data: session } = useSession();

  if (session){
    redirect("/")
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<String>("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true)
    console.log(values)
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true, 
      callbackUrl: "/"
    });
    console.log("resultttt", result)
    if (result?.error) {
      setLoginError(result.error);
      setLoading(false)
    } else {
      console.log("Login successful!");
      setLoading(false)
      redirect("/register")
    }
  };

  return (
    <div className="font-primaryFont font-bold bg-gradient-to-r from-blue-purple-0 to-blue-purple-100 h-screen flex items-center justify-center">
      <div className="w-30p">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="py-3 px-10 overflow-y-auto rounded-2xl shadow-md box-border bg-[#d6dce9] ">
            {loginError != "" && (
              <p className="px-4 py-4 mt-4 flex bg-red text-white rounded-md">
                <span className="pt-1 pr-5">
                  <AiFillWarning />
                </span>
                <span className="pa-0">{loginError}</span>
              </p>
            )}
            <div className="my-5">
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
            <div className="my-5">
              <label className="block my-2 text-black">Password</label>
              <Field
                id="password"
                name="password"
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium text-black"
                placeholder="Password"
                type="Password"
              />
              <ErrorMessage
                className="text-red"
                name="password"
                component="div"
              />
            </div>
            <p className="mt-3 text-blue">Forgot Password?</p>
            <button
              type="submit"
              className={`py-2 px-5 my-3 text-secondary rounded-md w-full bg-lightPrimary text-white ${
                !loading ? "hover:bg-darkPrimary transition duration-500" : ""
              }`}
              disabled={loading}
            >
              {loading ? <Spinner /> : <h1>Login</h1>}
            </button>
            <p className="mt-3 text-center text-black">
              Don&apos;t have an account?{" "}
              <Link href="/register">
                <span className="text-blue">Sign Up</span>
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};