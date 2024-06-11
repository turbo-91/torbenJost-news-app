import DateRangeComp from "./Date Range Picker/DateRangeComp";
import LanguageDropdown from "./Language Dropdown/LanguageDropdownComp";

export default function SearchBar() {
  return (
    <>
      <DateRangeComp />
      <input name="from"></input>
      <label className="input" htmlFor="from">
        keywords:
      </label>
      <input name="from"></input>
      <LanguageDropdown />
      <button className="button">search</button>
    </>
  );
}
