import { useState } from "react";
// Import utility functions and constants for generating calendar data and displaying day names and month names in the calendar components
import { DAYS_OF_WEEK, YEARS, getCalendarDays } from "../../utils/CalendarUtils.js";
import PropTypes from "prop-types";

// React component that renders a calendar grid with navigation buttons and date selection functionality
const CalendarGrid = ({ setSelectedDate }) => {
  // Use the useState hook to manage the current date and the selected date in the calendar
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate the array of day objects for the calendar grid based on the current date
  const days = getCalendarDays(currentDate);

  // Function to navigate to the previous month by updating the current date state
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );

  // Function to navigate to the next month by updating the current date state
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );

  // Function to navigate to the current month and set the selected date to today
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Function to handle the selection of a date in the calendar grid
  const handleSelectDate = (date) => {
    // Update the selected date state with the chosen date
    setSelectedDate(date);

    // Check if the selected date is in a different month than the current date, and if so, update the current date state to the selected date
    const isDifferentMonth =
      date.getMonth() !== currentDate.getMonth() ||
      date.getFullYear() !== currentDate.getFullYear();

    // If the selected date is in a different month, update the current date to the selected date to navigate to that month in the calendar grid
    if (isDifferentMonth) setCurrentDate(date);
  };

  // Render the calendar grid with navigation buttons and date selection functionality
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {/* Render navigation buttons for previous month, next month, and today, along with the current month display and year selector */}
        <button className="calendar-button-previous" onClick={prevMonth}>
          Prev
        </button>

        <h3 className="current-month">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
        </h3>

        {/* Year selector that allows users to quickly navigate to a different year in the calendar grid. */}
        <select
          className="year-selector"
          value={currentDate.getFullYear()}
          onChange={(e) => {
            // Parse the selected year from the dropdown and update the current date state to reflect the new year.
            const newYear = Number(e.target.value);

            // Update the current date to the new year, which will trigger a re-render of the calendar grid with the new year's dates
            setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
          }}
        >
          {/* Render the options for the year selector dropdown, allowing users to choose from a range of years defined in the YEARS constant. */}
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button className="calendar-button-next" onClick={nextMonth}>
          Next
        </button>
        
        <button className="calendar-button-today" onClick={goToToday}>
          Today
        </button>
      </div>

      {/* Render the calendar grid with the days of the week and the day buttons for each date in the calendar */}
      <div className="calendar-grid">
        {/* Render the days of the week as headers for the calendar grid */}
        {DAYS_OF_WEEK.map((day) => (
          <span className="calendar-weekdays" key={day}>
            {day}
          </span>
        ))}

        {/* Render the day buttons for each date in the calendar grid, allowing users to select a date and navigate to different months if necessary */}
        <div className="calendar-days">
          {days.map((item) => {
            // Calculate the date for each cell in the calendar grid based on the current date and the month offset for the day object
            const cellDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + item.monthOffset,
              item.day,
            );

            // Render a button for each day in the calendar grid
            return (
              <button
                className="calendar-day-button"
                key={item.key}
                onClick={() => handleSelectDate(cellDate)}
              >
                {item.day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

CalendarGrid.propTypes = {
  // Prop type validation for the setSelectedDate prop, which should be a function that updates the selected date state in the parent component 
  // and is required for the component to function properly
  setSelectedDate: PropTypes.func.isRequired,
};

// Export the CalendarGrid component as the default export of this module
export default CalendarGrid;