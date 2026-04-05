import { useState } from "react";
import PropTypes from "prop-types";
import { MONTH_NAMES } from "../../utils/CalendarUtils.js";
import EditBirthdayModal from "../crud-modals/EditBirthdayModal";
import DeleteBirthdayModal from "../crud-modals/DeleteBirthdayModal";

// Component to display a list of all birthdays with options to edit or delete each entry
const AllBirthdaysList = ({ birthdays, loading, error, updateBirthday, deleteBirthday }) => {
  // State to manage the currently editing and deleting birthday entries
  const [editingBirthday, setEditingBirthday] = useState(null);
  const [deletingBirthday, setDeletingBirthday] = useState(null);

  // Render the list of birthdays with appropriate messages for loading, errors, and empty state
  return (
    <div className="all-birthdays-container">
      <h1 className="all-birthdays-title">All Birthdays</h1>
      
      {/* Display error message if there is an error, loading message if data is being fetched, and a message for no birthdays found */}
      {error && <div className="ab-error-message">Error: {error}</div>}
      {loading && <div className="ab-loading-message">Loading...</div>}
      {!loading && !error && birthdays.length === 0 && (
        <div className="ab-no-birthdays-message">No birthdays found.</div>
      )}

      {/* Map through the list of birthdays and display each one with options to edit or delete */}
      {birthdays.map((birthday) => {
        const [year, month, day] = birthday.birthdate.split("-");
        
        return (
          <div key={birthday.id} className="ab-birthday-item">
            {birthday.name} - {MONTH_NAMES[Number.parseInt(month) - 1]} {day},{" "}
            {year}: {birthday.note}
            <div className="ab-birthday-actions">
              <button className="ab-edit-button" onClick={() => setEditingBirthday(birthday)}>
                Edit
              </button>
              <button className="ab-delete-button" onClick={() => setDeletingBirthday(birthday)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {/* Modals for editing and deleting birthdays, which are conditionally rendered based on the state of editingBirthday and deletingBirthday */}
      {editingBirthday && (
        <EditBirthdayModal
          birthday={editingBirthday}
          onClose={() => setEditingBirthday(null)}
          onUpdate={updateBirthday}
        />
      )}

      {deletingBirthday && (
        <DeleteBirthdayModal
          birthday={deletingBirthday}
          onClose={() => setDeletingBirthday(null)}
          onDelete={deleteBirthday}
        />
      )}
    </div>
  );
};

// Define prop types for the component to ensure correct usage and provide better documentation
AllBirthdaysList.propTypes = {
  birthdays: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  updateBirthday: PropTypes.func.isRequired,
  deleteBirthday: PropTypes.func.isRequired,
};

// Export the component as the default export of the module
export default AllBirthdaysList;