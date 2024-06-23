import React from "react";

export default function LanguageDropdown({ languageValue, setLanguageValue }) {
  const options = [
    { label: "Arabic", value: "ar" },
    { label: "Chinese", value: "zh" },
    { label: "Dutch", value: "nl" },
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Hebrew", value: "he" },
    { label: "Italian", value: "it" },
    { label: "Norwegian", value: "no" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Spanish", value: "es" },
    { label: "Swedish", value: "sv" },
    { label: "Urdu", value: "ur" },
  ];
  function handleSelect(event) {
    setLanguageValue(event.target.value);
  }
  return (
    <div className="flex justify-content-center mt-5">
      <div className="w-50 p-3 border rounded">
        <select
          id="select-language"
          className="form-select"
          onChange={handleSelect}
        >
          <option>All</option>
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
