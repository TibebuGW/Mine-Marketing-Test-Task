import { QueryResult } from "../../types/QueryResultType";

interface propType {
  countryDetail: QueryResult;
}

export default function CountryCard(props: propType) {
  return (
    <div className=" flex flex-col items-center justify-center rounded-2xl shadow-lg hover:shadow-2xl">
      <p className="py-4 px-4">
        <span className="font-bold">Name:</span> {props.countryDetail.name}{" "}
      </p>
      <p className="py-4 px-4">
        <span className="font-bold">Capital City:</span>{" "}
        {props.countryDetail.capitalCity}{" "}
      </p>
      <p className="py-4 px-4">
        <span className="font-bold">Code:</span> {props.countryDetail.code}{" "}
      </p>
      <p className="py-4 px-4">
        <span className="font-bold">Currency Code:</span>{" "}
        {props.countryDetail.currencyCode}{" "}
      </p>
      <p className="py-4 px-4">
        <span className="font-bold">Phone Code:</span>{" "}
        {props.countryDetail.phoneCode}{" "}
      </p>
    </div>
  );
}
