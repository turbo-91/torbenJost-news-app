import React from "react";
import { useState } from "react";

export default function LanguageDropdown() {
  let [languageValue, setLanguageValue] = useState("");
  const options = [
    { label: "Arabic", value: 1 },
    { label: "Chinese", value: 2 },
    { label: "Dutch", value: 3 },
    { label: "English", value: 4 },
    { label: "French", value: 5 },
    { label: "German", value: 6 },
    { label: "Hebrew", value: 7 },
    { label: "Italian", value: 8 },
    { label: "Norwegian", value: 9 },
    { label: "Portuguese", value: 10 },
    { label: "Russian", value: 11 },
    { label: "Spanish", value: 12 },
    { label: "Swedish", value: 13 },
    { label: "Urdu", value: 14 },
  ];
  function handleSelect(event) {
    setLanguageValue(event.target.value);
  }
  return (
    <div className="flex justify-content-center mt-5">
      <div className="w-50 p-3 border rounded">
        <select className="form-select" onChange={handleSelect}>
          <option></option>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p>{languageValue}</p> {/*displayed just for development */}
      </div>
    </div>
  );
}
