import { useState } from "react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Generates an array of day objects for the calendar grid based on the provided date
function getCalendarDays(date) {
  // Extract the year and month from the provided date
  const year = date.getFullYear();
  const month = date.getMonth();

  // Calculate the first day of the month, the last date of the month, and the last date of the previous month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

  // Initialize an empty array to hold the day objects for the calendar grid
  const days = [];

  // Add day objects for the previous month to fill the first week of the calendar grid
  for (let i = firstDayOfMonth; i > 0; i--) {
    days.push({
      day: lastDateOfPrevMonth - i + 1,
      isCurrentMonth: false,
      monthOffset: -1,
      key: `prev-${lastDateOfPrevMonth - i + 1}`,
    });
  }

  // Add day objects for the current month to fill the calendar grid
  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      monthOffset: 0,
      key: `current-${i}`,
    });
  }

  // Add day objects for the next month to fill the remaining cells of the calendar grid
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      monthOffset: 1,
      key: `next-${i}`,
    });
  }

  // Return the array of day objects for the calendar grid
  return days;
}

// React component that renders a calendar grid with navigation buttons and date selection functionality
const Calendar = () => {
  // Use the useState hook to manage the current date and the selected date in the calendar
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    if (isDifferentMonth) setCurrentDate(date);
  };

  console.log("selectedDate", selectedDate);

  // Render the calendar grid with navigation buttons and date selection functionality
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {/* Render navigation buttons for previous month, next month, and today, along with the current month and year display */}
        <button className="calendar-button-previous" onClick={prevMonth}>
          Prev
        </button>
        <h3 className="current-month-year">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h3>
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

// Export the Calendar component as the default export of this module
export default Calendar;