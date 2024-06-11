import DateRangeComp from "./DateRangePicker/DateRangeComp";
import LanguageDropdown from "./LanguageDropdown/LanguageDropdownComp";
import { useState } from "react";
import useSWR from "swr";

// I need to find a way to
// get all the form data in the right format
// to then store them in variables
// that will be dynamically inserted in the GET URL
// that I will use to fetch data

export default function SearchBar() {
  // makes spaces impossible in the input field to make sure there is only one keyword
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };
  // States to store date range & language dropdown value
  const [dateRangeFrom, setDateRangeFrom] = useState("");
  const [dateRangeTo, setDateRangeTo] = useState("");
  const [languageValue, setLanguageValue] = useState("");
  const [keyWord, setKeyword] = useState("");

  // Data fetching
  const [url, setUrl] = useState(null);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(
      `https://newsapi.org/v2/everything?q=${keyWord}&from=${dateRangeFrom}&to=${dateRangeTo}&language=${languageValue}&apiKey=21247b89f2cf48c48d0df5ed148af376`
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DateRangeComp
          dateRange={dateRangeFrom}
          setDateRange={setDateRangeFrom}
          labelDateRange={"From"}
        />
        <DateRangeComp
          dateRange={dateRangeTo}
          setDateRange={setDateRangeTo}
          labelDateRange={"To"}
        />
        <label className="input" htmlFor="keywords">
          type a keyword:
        </label>
        <input
          id="keywords"
          value={keyWord}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <LanguageDropdown
          languageValue={languageValue}
          setLanguageValue={setLanguageValue}
        />
        <button className="button" type="submit">
          search
        </button>
      </form>
      {error && <div>Failed to load data</div>}
      {!error && !data && url && <div>Loading...</div>}
      {data && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
