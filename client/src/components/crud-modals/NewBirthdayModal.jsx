import { useState } from "react";
import PropTypes from "prop-types";

// Modal component for adding a new birthday
const NewBirthdayModal = ({ selectedDate, onClose, onCreate, theme }) => {
  // Local state for form inputs and error handling
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);

  // We first break down the selected date to ensure that the date displayed is today's date
  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Store that date in a local state for birthdates
  const [birthdate, setBirthdate] = useState(formatLocalDate(selectedDate));

  // Because the date stored is based on local time, displaying it will cause it to shift one day in the past
  // This helper function helps push the day one day ahead artificially
  const parseLocalDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Handle the save action when the user clicks the "Save" button
  const handleSave = async () => {
    // Basic validation to ensure the name field is not empty
    try {
      // Clear any previous errors
      setError(null);

      // Validate that the name is not empty
      if (!name.trim()) {
        setError("Name is required");
        return;
      }

      // Call the onCreate function passed as a prop to create the new birthday entry
      await onCreate(name, note, birthdate);
    } catch (err) {
      setError(err.message || "Failed to add birthday");
    }
  };

  // Render the modal with form inputs and buttons
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className={`${theme.container} w-full max-w-md p-6 rounded-xl shadow-xl`}
      >
        <h2 className="text-2xl font-semibold mb-2">Add Birthday</h2>

        <p className="mb-4 text-xl">
          Date:{" "}
          {birthdate
            ? new Intl.DateTimeFormat(navigator.language).format(
                parseLocalDate(birthdate),
              )
            : birthdate}
        </p>

        <label htmlFor="name" className="block mb-1 text-lg font-semibold">
          Name
        </label>
        <input
          id="name"
          type="text"
          className={`${theme.grid} w-full p-2 mb-3 rounded text-xl`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <label htmlFor="year" className="block mb-1 text-lg font-semibold">
          Birthdate
        </label>
        <input
          id="birthdate"
          type="date"
          className={`${theme.grid} w-full p-2 mb-3 rounded text-xl`}
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <label htmlFor="note" className="block mb-1 text-lg font-semibold">
          Note (Optional)
        </label>
        <textarea
          id="note"
          rows="4"
          className={`${theme.grid} w-full p-2 mb-3 rounded text-xl`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
        />

        {error && <p className="mb-3 text-xl">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`${theme.buttonSecondary} rounded px-3 py-1 font-semibold text-xl`}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className={`${theme.buttonPrimary} rounded px-3 py-1 font-semibold text-xl`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Define prop types for the component to ensure correct usage
NewBirthdayModal.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,

  theme: PropTypes.shape({
    container: PropTypes.string,
    grid: PropTypes.string,
    buttonPrimary: PropTypes.string,
    buttonSecondary: PropTypes.string,
  }),
};

// Export the component for use in other parts of the application
export default NewBirthdayModal;
