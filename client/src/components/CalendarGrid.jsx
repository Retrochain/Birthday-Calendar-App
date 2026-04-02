import { useState } from "react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getCalendarDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  for (let i = firstDayOfMonth; i > 0; i--) {
    days.push({
      day: lastDateOfPrevMonth - i + 1,
      isCurrentMonth: false,
      monthOffset: -1,
      key: `prev-${lastDateOfPrevMonth - i + 1}`,
    });
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      monthOffset: 0,
      key: `current-${i}`,
    });
  }

  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      monthOffset: 1,
      key: `next-${i}`,
    });
  }

  return days;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const days = getCalendarDays(currentDate);

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    const isDifferentMonth =
      date.getMonth() !== currentDate.getMonth() ||
      date.getFullYear() !== currentDate.getFullYear();
    if (isDifferentMonth) setCurrentDate(date);
  };

  console.log("selectedDate", selectedDate);
  return (
    <div className="calendar-container">
      <div className="calendar-header">
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

      <div className="calendar-grid">
        {DAYS_OF_WEEK.map((day) => (
          <span className="calendar-weekdays" key={day}>
            {day}
          </span>
        ))}

        <div className="calendar-days">
          {days.map((item) => {
            const cellDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + item.monthOffset,
              item.day,
            );

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
}

export default Calendar;