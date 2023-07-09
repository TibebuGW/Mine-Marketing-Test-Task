"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
export const Login = () => {
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

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
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
            <div className="my-5">
              <label className="block my-2 text-black">Email</label>
              <Field
                id="email"
                name="email"
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium"
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
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium"
                placeholder="Password"
                type="Password"
              />
              <ErrorMessage className="text-red" name="password" component="div" />
            </div>
            <p className="mt-3 text-blue">Forgot Password?</p>
            <button type="submit" className="py-2 px-5 my-3 text-secondary rounded-md w-full bg-lightPrimary hover:bg-darkPrimary">
              Login
            </button>
            <p className="mt-3 text-center text-black">
              Don&apos;t have an account?{" "}
              <span className="text-blue">Sign Up</span>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
