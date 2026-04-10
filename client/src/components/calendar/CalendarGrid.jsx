import { useState } from "react";
// Import utility functions and constants for generating calendar data and displaying day names and month names in the calendar components
import {
  DAYS_OF_WEEK,
  YEARS,
  getCalendarDays,
} from "../../utils/CalendarUtils.js";
import PropTypes from "prop-types";

// React component that renders a calendar grid with navigation buttons and date selection functionality
const CalendarGrid = ({ setSelectedDate, upcomingBirthdays, theme }) => {
  // Get the current date to use for navigating to the current month and highlighting today's date in the calendar grid
  const today = new Date();

  // Use the useState hook to manage the current date and the selected date in the calendar
  const [currentDate, setCurrentDate] = useState(new Date());

  // Use the useState hook to manage the selected date state in the calendar for visual changes
  const [selectedDateState, setSelectedDateState] = useState(null);

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
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Function to handle the selection of a date in the calendar grid
  const handleSelectDate = (date, isCurrentMonth) => {
    // Update the selected date and selected date state with the chosen date
    setSelectedDate(date);
    setSelectedDateState(date);

    // If the selected date is in a different month, update the current date to the selected date to navigate to that month in the calendar grid
    if (!isCurrentMonth) setCurrentDate(date);
  };

  // This method checks if the provided date is the same as today's date
  const isToday = (date) => {
    const isSameDay = date.getDate() === today.getDate();
    const isSameMonth = date.getMonth() === today.getMonth();
    const isSameYear = date.getFullYear() === today.getFullYear();

    return isSameDay && isSameMonth && isSameYear;
  };

  // This method checks if the provided date is the one that is currently selected
  const isSelected = (date) => {
    if (!selectedDateState) return false;

    const isSameDay = date.getDate() === selectedDateState.getDate();
    const isSameMonth = date.getMonth() === selectedDateState.getMonth();
    const isSameYear = date.getFullYear() === selectedDateState.getFullYear();

    return isSameDay && isSameMonth && isSameYear;
  };

  // This method checks if the current selected month is the current month via monthOffset
  const isCurrentMonth = (monthOffset) => {
    if (monthOffset === 0) return true;
  };

  // Helper function to display conditional tailwind css styles
  const getDateButtonClass = (cellDate, monthOffset) => {
    if (!isCurrentMonth(monthOffset)) {
      return theme.day.outside;
    }
    if (isSelected(cellDate)) {
      return theme.day.selected;
    }
    if (isToday(cellDate)) {
      return theme.day.today;
    }
    return theme.day.default;
  };

  // Render the calendar grid with navigation buttons and date selection functionality
  return (
    <div
      className={`${theme.container} container mx-auto p-4 rounded-xl shadow-lg shadow-black/40`}
    >
      <div className="inline-flex items-center justify-center gap-4 mb-4 text-xl flex-wrap">
        {/* Render navigation buttons for previous month, next month, and today, along with the current month display and year selector */}
        <button
          className={`${theme.buttonPrimary} font-semibold py-1 px-3 rounded shadow-sm hover:shadow-lg transition-shadow duration-300`}
          onClick={prevMonth}
        >
          Prev
        </button>

        <h3 className="text-2xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
        </h3>

        {/* Year selector that allows users to quickly navigate to a different year in the calendar grid. */}
        <select
          className={`${theme.select} rounded-lg shadow-sm hover:shadow-lg focus:outline-none transition-all duration-300 px-2 py-1 font-semibold text-2xl`}
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
            <option
              key={year}
              value={year}
              className={`${theme.option} ${
                year === currentDate.getFullYear() ? theme.optionSelected : ""
              }`}
            >
              {year}
            </option>
          ))}
        </select>

        <button
          className={`${theme.buttonPrimary} font-semibold py-1 px-3 rounded shadow-sm hover:shadow-lg transition-shadow duration-300`}
          onClick={nextMonth}
        >
          Next
        </button>

        <button
          className={`${theme.buttonSecondary} font-semibold py-1 px-3 rounded shadow-sm hover:shadow-lg transition-shadow duration-300`}
          onClick={goToToday}
        >
          Today
        </button>
      </div>

      {/* Render the calendar grid with the days of the week and the day buttons for each date in the calendar */}
      <div
        className={`${theme.header} grid grid-cols-7 w-full rounded-t-xl border-b-2`}
      >
        {/* Render the days of the week as headers for the calendar grid */}
        {DAYS_OF_WEEK.map((day) => (
          <span
            className="py-3 px-2 text-center font-semibold text-md sm:text-xl truncate"
            key={day}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Render the day buttons for each date in the calendar grid, allowing users to select a date and navigate to different months if necessary */}
      <div className={`${theme.grid} grid grid-cols-7 w-full border-b-2`}>
        {days.map((item) => {
          // Calculate the date for each cell in the calendar grid based on the current date and the month offset for the day object
          const cellDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + item.monthOffset,
            item.day,
          );

          const birthdaysForDay = upcomingBirthdays.filter((ub) => {
            const [, month, day] = ub.birthdate.split("-");
            return (
              cellDate.getMonth() === Number(month) - 1 &&
              cellDate.getDate() === Number(day)
            );
          });

          // Render a button for each day in the calendar grid
          return (
            <button
              className={`relative border hover:shadow-md h-16 md:h-30 px-2 py-6 text-left text-lg font-semibold transition-colors duration-400 ${theme.cell} ${getDateButtonClass(cellDate, item.monthOffset)}`}
              key={item.key}
              onClick={() => handleSelectDate(cellDate, item.isCurrentMonth)}
            >
              {/* Day number rendered in the top-left */}
              <span className="absolute top-1 left-2 text-md font-bold">
                {item.day}
              </span>

              {/* Display for the current birthdays for each day*/}
              {item.monthOffset === 0 && (
                <>
                  {/* For mobile screen we will show dots (upto 3) */}
                  <div className="flex sm:hidden gap-1 mt-5">
                    {birthdaysForDay.slice(0, 3).map((j, i) => (
                      <div
                        key={j + i}
                        className={`${theme.birthdayDot} w-2 h-2 rounded-full`}
                      />
                    ))}
                  </div>

                  {/* For desktop screens we will show names (upto 2) */}
                  <div className="hidden sm:flex flex-col gap-0.5 mt-3 text-md">
                    {birthdaysForDay.slice(0, 2).map((ub) => (
                      <span
                        key={`${ub.name}-${ub.birthdate}`}
                        className={`${theme.birthdayTag} truncate capitalize rounded px-1`}
                      >
                        {ub.name}
                      </span>
                    ))}

                    {/* For more then 2 birthdays, just display a count of however many extra birthdays there are */}
                    {birthdaysForDay.length > 2 && (
                      <span className="text-sm text-gray-300">
                        +{birthdaysForDay.length - 2}
                      </span>
                    )}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

CalendarGrid.propTypes = {
  // Prop type validation for the setSelectedDate prop, which should be a function that updates the selected date state in the parent component
  // and is required for the component to function properly
  setSelectedDate: PropTypes.func.isRequired,
  upcomingBirthdays: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  theme: PropTypes.shape({
    container: PropTypes.string,
    header: PropTypes.string,
    grid: PropTypes.string,
    cell: PropTypes.string,

    buttonPrimary: PropTypes.string,
    buttonSecondary: PropTypes.string,

    select: PropTypes.string,
    option: PropTypes.string,
    optionSelected: PropTypes.string,

    birthdayDot: PropTypes.string,
    birthdayTag: PropTypes.string,

    day: PropTypes.shape({
      default: PropTypes.string,
      outside: PropTypes.string,
      selected: PropTypes.string,
      today: PropTypes.string,
    }),
  }).isRequired,
};

// Export the CalendarGrid component as the default export of this module
export default CalendarGrid;
