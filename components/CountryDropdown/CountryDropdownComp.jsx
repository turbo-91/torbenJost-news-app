import React from "react";

export default function CountryDropdown({ countryValue, setCountryValue }) {
  const options = [
    { label: "United Arab Emirates", value: "ae" },
    { label: "Argentina", value: "ar" },
    { label: "Austria", value: "at" },
    { label: "Australia", value: "au" },
    { label: "Belgium", value: "be" },
    { label: "Bulgaria", value: "bg" },
    { label: "Brazil", value: "br" },
    { label: "Canada", value: "ca" },
    { label: "Switzerland", value: "ch" },
    { label: "China", value: "cn" },
    { label: "Colombia", value: "co" },
    { label: "Cuba", value: "cu" },
    { label: "Czech Republic", value: "cz" },
    { label: "Germany", value: "de" },
    { label: "Egypt", value: "eg" },
    { label: "France", value: "fr" },
    { label: "United Kingdom", value: "gb" },
    { label: "Greece", value: "gr" },
    { label: "Hong Kong", value: "hk" },
    { label: "Hungary", value: "hu" },
    { label: "Indonesia", value: "id" },
    { label: "Ireland", value: "ie" },
    { label: "Israel", value: "il" },
    { label: "India", value: "in" },
    { label: "Italy", value: "it" },
    { label: "Japan", value: "jp" },
    { label: "South Korea", value: "kr" },
    { label: "Lithuania", value: "lt" },
    { label: "Latvia", value: "lv" },
    { label: "Morocco", value: "ma" },
    { label: "Mexico", value: "mx" },
    { label: "Malaysia", value: "my" },
    { label: "Nigeria", value: "ng" },
    { label: "Netherlands", value: "nl" },
    { label: "Norway", value: "no" },
    { label: "New Zealand", value: "nz" },
    { label: "Philippines", value: "ph" },
    { label: "Poland", value: "pl" },
    { label: "Portugal", value: "pt" },
    { label: "Romania", value: "ro" },
    { label: "Serbia", value: "rs" },
    { label: "Russia", value: "ru" },
    { label: "Saudi Arabia", value: "sa" },
    { label: "Sweden", value: "se" },
    { label: "Singapore", value: "sg" },
    { label: "Slovenia", value: "si" },
    { label: "Slovakia", value: "sk" },
    { label: "Thailand", value: "th" },
    { label: "Turkey", value: "tr" },
    { label: "Taiwan", value: "tw" },
    { label: "Ukraine", value: "ua" },
    { label: "United States", value: "us" },
    { label: "Venezuela", value: "ve" },
    { label: "South Africa", value: "za" },
  ];

  function handleSelect(event) {
    setCountryValue(event.target.value);
  }
  return (
    <div className="flex justify-content-center mt-5">
      <div className="w-50 p-3 border rounded">
        <select className="form-select" onChange={handleSelect}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
