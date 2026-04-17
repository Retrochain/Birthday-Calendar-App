import PropTypes from "prop-types";
import { MONTH_NAMES } from "../../utils/CalendarUtils.js";

// Component to display upcoming birthdays
const UpcomingBirthdays = ({ birthdays, loading, error, theme }) => {
  // Render the list of upcoming birthdays, or appropriate messages for loading, errors, or no birthdays
  return (
    <div className="container mx-auto pl-2">
      <h1
        className={`${theme.title} font-bebas text-5xl items-center justify-center pt-2 pb-3`}
      >
        Birthdays This Month
      </h1>

      {/* Display error message if there is an error, loading message if data is being fetched, and a message if there are no birthdays. */}
      {error && <div className="mt-3 text-3xl">Error: {error}</div>}
      {loading && (
        <div
          className={`${theme.upcoming} shadow rounded-md p-4 max-w-sm w-full mb-4`}
        >
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className={`${theme.select} h-4 rounded w-3/4`}></div>
              <div className="space-y-2">
                <div className={`h-4 ${theme.select} rounded`}></div>
                <div className={`h-4 ${theme.select} rounded w-5/6`}></div>
                <div className="flex flex-col lg:flex-row gap-2 mt-3"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && !error && (!birthdays || birthdays.length === 0) && (
        <div className="mt-3 text-2xl">No birthdays this month.</div>
      )}

      {/* Map through the list of birthdays and display each one with the name, formatted birthdate, and note. */}
      <div className="grid grid-cols-3 sm:grid sm:grid-cols-2 gap-4 text-wrap">
        {birthdays.map((birthday) => {
          const [year, month, day] = birthday.birthdate.split("-");
          return (
            <div
              key={birthday.id}
              className={`${theme.upcoming} rounded-xl shadow-sm p-4`}
            >
              <div className="text-xl font-bold truncate">{birthday.name}</div>

              <div className="text-lg mt-1 font-semibold">
                {MONTH_NAMES[Number.parseInt(month) - 1]} {day}, {year}
              </div>

              {birthday.note && (
                <div className="text-lg mt-2 line-clamp-3">{birthday.note}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Define PropTypes for the component to ensure correct prop types are passed in
UpcomingBirthdays.propTypes = {
  birthdays: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  theme: PropTypes.shape({
    title: PropTypes.string,
    upcoming: PropTypes.string,
    select: PropTypes.string.isRequired,
  }).isRequired,
};

// Export the UpcomingBirthdays component as the default export of this module
export default UpcomingBirthdays;
