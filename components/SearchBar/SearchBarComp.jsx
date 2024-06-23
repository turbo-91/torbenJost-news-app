import DateRangeCompFrom from "./DateRangePicker/DateRangeCompFrom";
import DateRangeCompTo from "./DateRangePicker/DateRangeCompTo";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdownComp";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 1rem;
  border: 1px solid #001233;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem; /* Adjusted font size to 0.875rem (smaller size) */
  margin-bottom: 5px;
  font-family: Helvetica, Arial, sans-serif;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.75rem; /* Adjusted font size to 0.75rem (smaller size) */
  width: 100%;
  line-height: 1.5; /* Adjust line height as needed */
`;

const InlineContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap; /* Allow items to wrap */
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: transparent;
  color: #001233;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;
  border: 1px solid #001233;

  &:hover {
    opacity: 80%;
  }
`;

const BottomContainer = styled.div`
  margin-top: 15px; /* Space between the rows */
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
  // Disable space key in input
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InlineContainer>
        <FormGroup>
          <Label htmlFor="date-from">From:</Label>
          <DateRangeCompFrom
            dateRange={dateRangeFrom}
            setDateRange={setDateRangeFrom}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date-to">To:</Label>
          <DateRangeCompTo
            dateRange={dateRangeTo}
            setDateRange={setDateRangeTo}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="select-language">Select a language:</Label>
          <LanguageDropdown
            languageValue={languageValue}
            setLanguageValue={setLanguageValue}
          />
        </FormGroup>
      </InlineContainer>

      <BottomContainer>
        <FormGroup>
          <Label htmlFor="keywords">Type one keyword:</Label>
          <Input
            id="keywords"
            value={keyWord}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </FormGroup>
      </BottomContainer>

      <Button type="submit">Search</Button>
    </Form>
  );
}
