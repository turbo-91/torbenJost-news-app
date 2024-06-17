// components/SearchBar/SearchBarComp.js
import DateRangeComp from "./DateRangePicker/DateRangeComp";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdownComp";
import { useState } from "react";
import styled from "styled-components";

// Styled components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: #0056b3;
  }
`;

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
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="date-from">From</Label>
      <DateRangeComp
        id="date-from"
        dateRange={dateRangeFrom}
        setDateRange={setDateRangeFrom}
      />
      <Label htmlFor="date-to">To</Label>
      <DateRangeComp dateRange={dateRangeTo} setDateRange={setDateRangeTo} />
      <Label htmlFor="date-to">Select a language:</Label>
      <LanguageDropdown
        id="date-to"
        languageValue={languageValue}
        setLanguageValue={setLanguageValue}
      />
      <Label htmlFor="keywords">Type a keyword:</Label>
      <Input
        id="keywords"
        value={keyWord}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}
