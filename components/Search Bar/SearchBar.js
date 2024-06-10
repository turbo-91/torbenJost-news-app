import LanguageDropdown from "./Language Dropdown/LanguageDropdown";

export default function SearchBar() {
  return (
    <>
      <label className="input" htmlFor="from">
        from:
      </label>
      <input name="from"></input>
      <label className="input" htmlFor="to">
        to:
      </label>
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
