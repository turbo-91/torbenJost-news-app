import DateRangeComp from "./DateRangePicker/DateRangeComp";
import LanguageDropdown from "./LanguageDropdown/LanguageDropdownComp";

// I need to find a way to
// get all the form data in the right format
// to then store them in variables
// that will be dynamically inserted in the GET URL
// that I will use to fetch data

export default function SearchBar() {
  return (
    <>
      <DateRangeComp />
      <label className="input" htmlFor="keywords">
        type a keyword:
      </label>
      <input id="keywords"></input>
      <LanguageDropdown />
      <button className="button">search</button>
    </>
  );
}
