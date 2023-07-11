import { QueryResult } from "@/app/types/QueryResultType";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import CountryCard from "../countryCard/countrycard";

interface propType {
  fetchingPreviousResults: boolean;
}

export default function PreviousResults(props: propType) {
  const [previousResults, setPreviousResults] = useState<QueryResult[]>([]);
  const searchResults = useAppSelector((state) => state.searchResultsReducer);

  useEffect(() => {
    const newResults = searchResults.results.filter(
      (result) => !previousResults.includes(result)
    );
    setPreviousResults(previousResults.concat(newResults));
  }, [searchResults]);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="py-7">
        <div className="flex items-center justify-center">
          {previousResults.length ? (
            <div>
              <p className="my-5 font-bold text-2xl">Previous Search Results</p>
            </div>
          ) : (
            <div>
              <p className="my-5 font-bold text-2xl">No previous searches.</p>
            </div>
          )}
        </div>
        {props.fetchingPreviousResults ? (
          <div className="flex items-center justify-center">
            <p>
              <em>Fetching Previous Results . . .</em>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {previousResults.length
              ? previousResults.map((previousResult, i) => {
                  return (
                    <div>
                      <CountryCard key={i} countryDetail={previousResult} />
                    </div>
                  );
                })
              : ""}
          </div>
        )}
      </div>
    </div>
  );
}
