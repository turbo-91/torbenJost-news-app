import DateRangeComp from "./DateRangePicker/DateRangeComp";
import LanguageDropdown from "./LanguageDropdown/LanguageDropdownComp";

export default function SearchBar() {
  return (
    <>
      <DateRangeComp />
      <label className="input" htmlFor="keywords">
        keywords:
      </label>
      <input id="keywords"></input>
      <LanguageDropdown />
      <button className="button">search</button>
    </>
  );
}
