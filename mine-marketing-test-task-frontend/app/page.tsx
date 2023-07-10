"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import Spinner from "./components/spinner/spinner";

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

  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    inputValue: "",
  });

  const options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST
    }
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
    console.log("hereeeeeeeeeeee",process.env.RAPID_API_KEY)
    event.preventDefault();
    setFormValues({
      ...formValues,
      inputValue: event.target.value,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-20 w-full">
      <h1 className="my-5 font-bold text-2xl"> Welcome </h1>
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
            className={`p-5 bg-lightPrimary hover:bg-darkPrimary rounded-xl text-white ${loading ? 'px-8': ''}`}
            type="submit"
          >
            {loading ? <Spinner /> : <h1> Search </h1>}
          </button>
        </div>
      </form>
    </main>
  );
}
