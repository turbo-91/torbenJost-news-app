import DateRangeComp from "./DateRangePicker/DateRangeComp";
import LanguageDropdown from "./LanguageDropdown/LanguageDropdownComp";
import { useState } from "react";
import useSWR from "swr";

// I need to find a way to
// get all the form data in the right format
// to then store them in variables
// that will be dynamically inserted in the GET URL
// that I will use to fetch data

export default function SearchBar({
  dateRangeFrom,
  setDateRangeFrom,
  dateRangeTo,
  setDateRangeTo,
  languageValue,
  setLanguageValue,
  keyWord,
  setKeyword,
  onSearch,
}) {
  // makes spaces impossible in the input field to make sure there is only one keyword
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DateRangeComp
          dateRange={dateRangeFrom}
          setDateRange={setDateRangeFrom}
        />
        <DateRangeComp dateRange={dateRangeTo} setDateRange={setDateRangeTo} />
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
    </>
  );
}
