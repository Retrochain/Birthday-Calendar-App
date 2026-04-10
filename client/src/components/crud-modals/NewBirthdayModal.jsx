import { useState } from "react";
import PropTypes from "prop-types";

// Modal component for adding a new birthday
const NewBirthdayModal = ({ selectedDate, onClose, onCreate, theme }) => {
  // Local state for form inputs and error handling
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);

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
      await onCreate(name, note);
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
        <p className="mb-4 text-xl">Date: {selectedDate.toDateString()}</p>

        <input
          type="text"
          className={`${theme.grid} w-full p-2 mb-3 rounded text-xl`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <textarea
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
