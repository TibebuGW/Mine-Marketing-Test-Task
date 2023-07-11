import { QueryResult } from "@/app/types/QueryResultType";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CountryCard from "../countryCard/countrycard";

interface propType {
  fetchingPreviousResults: boolean;
}

export default function PreviousResults(props: propType) {
  const [previousResults, setPreviousResults] = useState<QueryResult[]>([]);
  const searchResults = useSelector((state: any) => state.searchResults);
  console.log("Search Resultssssss", searchResults)

  useEffect(() =>{
      setPreviousResults(searchResults.results);
  }, [searchResults])

  return (
    <div className="w-[70%] flex items-center justify-center">
      <div className="py-7">
        <div>
          <p className="my-2 font-bold text-2xl">Previous Results</p>
        </div>
        {props.fetchingPreviousResults ? (
          <div className="flex items-center justify-center">
            <p>
              <em>Fetching Previous Results . . .</em>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {previousResults.map((previousResult, i) => {
              return (
                <div>
                  <CountryCard key={i} countryDetail={previousResult} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
