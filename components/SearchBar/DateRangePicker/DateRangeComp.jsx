import React from "react";
import { useEffect, useState, useRef } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangeComp() {
  //state to store date:
  const [dateRange, setDateRange] = useState("");

  // open close calendar table state:
  const [open, setOpen] = useState(false);

  // useRef hook to get the target element to toggle
  const refOne = useRef(null);

  // set current date on component load:
  useEffect(() => {
    setDateRange(format(new Date(), "MM/dd/yyyy"));
    // event listeners to open/close calendar table
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // function: hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key);
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // function: Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // on date change, store data in state
  const handleSelect = (date) => {
    // console.log(date);
    console.log(format(date, "yyyy-MM-dd"));
    setDateRange(format(date, "MM/dd/yyyy"));
  };
  return (
    <div className="calenderWrap">
      <input
        value={dateRange}
        readOnly
        className="dataRangeInputBox"
        onClick={() => setOpen((open) => !open)} // open/close calendar table
      />
      {/* div to make close on outside click possible: */}
      <div ref={refOne}>
        {open && (
          <Calendar
            date={new Date()}
            onChange={handleSelect}
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
}
