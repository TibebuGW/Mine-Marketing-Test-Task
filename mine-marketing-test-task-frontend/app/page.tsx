"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";
import Spinner from "./components/spinner/spinner";
import { QueryFormValues } from "./types/QueryFormValuesType";
import { QueryResult, QueryResultDatabase } from "./types/QueryResultType";
import { AiFillWarning } from "react-icons/ai";
import CountryCard from "./components/countryCard/countrycard";
import { addResult } from "../redux/features/queryResult-slice";
import PreviousResults from "./components/previousResults/previousResults";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useAppSelector((state) => state.searchResultsReducer);
  console.log("resultsssss", searchResults.results)

  // console.log("hereeeeeeeeee", session);
  const [loading, setLoading] = useState<boolean>(false);
  const [queryError, setQueryError] = useState<string>("");
  const [showPreviousResults, setShowPreviousResults] =
    useState<boolean>(false);
  const [fetchingPreviousResults, setFetchingPreviousResults] =
    useState<boolean>(false);
  const [formValues, setFormValues] = useState<QueryFormValues>({
    inputValue: "",
  });
  const [queryResult, setQueryResult] = useState<QueryResult>({
    phoneCode: "",
    capitalCity: "",
    code: "",
    currencyCode: [],
    name: "",
  });

  const options = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_RAPID_API_URL}${formValues.inputValue}`,
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };

  const fetchAllResults = async () => {
    try {
      setFetchingPreviousResults(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}result/getresultsbyuser`,
        {
          params: {
            userEmail: session?.user?.email,
          },
        }
      );

      const allResults = response.data;

      for (var i = 0; i < allResults.length; i++) {
        const payload = {
          phoneCode: allResults[i].phoneCode,
          capitalCity: allResults[i].capitalCity,
          code: allResults[i].code,
          currencyCode: allResults[i].currencyCode,
          name: allResults[i].name,
          userEmail: session?.user?.email as string,
        };
        dispatch(addResult(payload));
      }
      setFetchingPreviousResults(false);
      setShowPreviousResults(true);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const saveUserResult = async (resultData: QueryResultDatabase) => {
    try {
      const payload = resultData;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}result/saveresult`,
        payload
      );
      if (response.status === 200) {
        dispatch(addResult(payload));
      }
      console.log("Result saved successfully.");
    } catch (error) {
      console.error("Error saving search result:", error);
    }
  };

  const submitUserQuery = async () => {
    try {
      setLoading(true);
      setQueryError("");
      var response = await axios.request(options);
      
      setQueryResult({
        phoneCode: response.data.data.callingCode,
        capitalCity: response.data.data.capital,
        code: response.data.data.code,
        currencyCode: response.data.data.currencyCodes,
        name: response.data.data.name,
      });

      const resultData = {
        phoneCode: response.data.data.callingCode,
        capitalCity: response.data.data.capital,
        code: response.data.data.code,
        currencyCode: response.data.data.currencyCodes,
        name: response.data.data.name,
        userEmail: session?.user?.email,
      };
      saveUserResult(resultData);
      if (showPreviousResults) {
        fetchAllResults();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setQueryResult({
          phoneCode: "",
          capitalCity: "",
          code: "",
          currencyCode: [],
          name: "",
        });
        setQueryError("Not a valid country code");
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitUserQuery();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormValues({
      ...formValues,
      inputValue: event.target.value,
    });
  };

  return (
    <main className={`flex bg-gradient-to-r from-blue-purple-0 to-blue-purple-100 flex-col items-center justify-start p-20 w-full ${(!queryResult.name && !showPreviousResults) || (showPreviousResults && !searchResults.results.length) ? 'h-screen': 'h-full'}`}>
      <div className="flex flex-row my-6">
        <h1 className="my-5 font-bold text-2xl mr-5">
          {`Welcome ${session?.user?.name ? session?.user?.name : ""}`}
        </h1>
        <button
          className="px-5 py-0 mx-5 bg-lightSecondary hover:bg-darkSecondary rounded-xl text-white transition duration-500"
          type="submit"
          onClick={() => fetchAllResults()}
        >
          See Previous Results
        </button>
        <button
          className="px-5 py-0 bg-lightPrimary hover:bg-darkPrimary rounded-xl text-white transition duration-500"
          type="submit"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
      <div className="my-3">
        <p className="font-semibold">
          <em>
            Please enter the two letter ISO 3166 code of the country you want to
            get details of.
          </em>
        </p>
        <p>
          <em>
            Example: ET for Ethiopia, US for United States of America, UA for
            Ukraine
          </em>
        </p>
        <p>
          <em>
            You can get the list of codes{" "}
            <a
              target="_blank"
              href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes"
            >
              <span className="text-blue">Here</span>
            </a>
            .
          </em>
        </p>
      </div>
      {queryError != "" && (
        <p className="px-4 py-4 mt-2 mb-4 flex bg-red text-white rounded-md">
          <span className="pt-1 pr-5">
            <AiFillWarning />
          </span>
          <span className="pa-0">{queryError} </span>
        </p>
      )}
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
            className={`p-5 bg-lightPrimary hover:bg-darkPrimary rounded-xl text-white transition duration-500 ${
              loading ? "px-8" : ""
            }`}
            type="submit"
          >
            {loading ? <Spinner /> : <h1> Search </h1>}
          </button>
        </div>
      </form>
      {queryResult.name && (
        <div className="flex flex-col items-center justify-center">
          <p className="my-5 font-bold text-2xl">
            Search Result
          </p>
            <CountryCard countryDetail={queryResult} />
        </div>
      )}
      {showPreviousResults ? (
        <PreviousResults fetchingPreviousResults={fetchingPreviousResults} />
      ) : (
        ""
      )}
    </main>
  );
}
