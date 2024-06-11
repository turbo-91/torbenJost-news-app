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
  const [dateRange, setDateRange] = useState("");
  const [languageValue, setLanguageValue] = useState("");
  const [keyWord, setKeyword] = useState("");

  // Data fetching

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://api.example.com/data?search=${query}`);
  };

  return (
    <>
      <DateRangeComp dateRange={dateRange} setDateRange={setDateRange} />
      <label className="input" htmlFor="keywords">
        type a keyword:
      </label>
      <input id="keywords" onKeyDown={handleKeyDown}></input>
      <LanguageDropdown
        languageValue={languageValue}
        setLanguageValue={setLanguageValue}
      />
      <button className="button">search</button>
    </>
  );
}