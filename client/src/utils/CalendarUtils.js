// This file contains utility functions for generating calendar data and constants used in the calendar components

// Array of day names to display in the calendar header
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Array of month names to display when formatting dates in the birthday lists
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Generate an array of years for the year selector dropdown, ranging from 60 years ago to 50 years in the future
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 110 }, (_, i) => currentYear - 60 + i);

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

// Export the utility functions and constants for use in other components
export { getCalendarDays, DAYS_OF_WEEK, MONTH_NAMES, YEARS };