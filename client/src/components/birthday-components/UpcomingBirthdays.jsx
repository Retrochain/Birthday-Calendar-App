import PropTypes from "prop-types";
import { MONTH_NAMES } from "../../utils/CalendarUtils.js";

// Component to display upcoming birthdays
const UpcomingBirthdays = ({ birthdays, loading, error }) => {
  // Render the list of upcoming birthdays, or appropriate messages for loading, errors, or no birthdays
  return (
    <div className="upcoming-birthdays">
      <h1 className="upcoming-title">Upcoming Birthdays</h1>

      {/* Display error message if there is an error, loading message if data is being fetched, and a message if there are no birthdays. */}
      {error && <div className="error-message">Error: {error}</div>}
      {loading && <div className="loading-message">Loading...</div>}
      {!loading && !error && (!birthdays || birthdays.length === 0) && (
        <div className="no-birthdays-message">No birthdays this month.</div>
      )}

      {/* Map through the list of birthdays and display each one with the name, formatted birthdate, and note. */}
      {birthdays.map((birthday) => {
        const [year, month, day] = birthday.birthdate.split("-");
        return (
          <div key={birthday.id} className="birthday-item">
            {birthday.name} - {MONTH_NAMES[Number.parseInt(month) - 1]} {day},{" "}
            {year}: {birthday.note}
          </div>
        );
      })}
    </div>
  );
};

// Define PropTypes for the component to ensure correct prop types are passed in
UpcomingBirthdays.propTypes = {
  birthdays: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

// Export the UpcomingBirthdays component as the default export of this module
export default UpcomingBirthdays;