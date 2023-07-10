"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import Spinner from "./components/spinner/spinner";
import Email from "next-auth/providers/email";

type FormValues = {
  inputValue: string;
};

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  
  console.log("hereeeeeeeeee", session);
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    inputValue: "",
  });

  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormValues({
      ...formValues,
      inputValue: event.target.value,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-20 w-full">
      <div className="flex flex-row my-6">
        <h1 className="my-5 font-bold text-2xl mr-5"> 
          {
            `Welcome ${session?.user?.firstName ? session?.user?.firstName: ""}`
          }
        </h1>
        <button
          className="px-5 py-0 bg-lightPrimary hover:bg-darkPrimary rounded-xl text-white"
          type="submit"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex w-full items-center justify-center">
          <input
            type="text"
            id="search-query"
            name="search-query"
            value={formValues.inputValue}
            className="border-black border-4 bg-grey rounded-xl px-4 py-4 w-[50%] mr-3 text-black"
            onChange={handleChange}
          />
          <button
            className={`p-5 bg-lightPrimary hover:bg-darkPrimary rounded-xl text-white ${
              loading ? "px-8" : ""
            }`}
            type="submit"
          >
            {loading ? <Spinner /> : <h1> Search </h1>}
          </button>
        </div>
      </form>
    </main>
  );
}
