import { useState } from "react";
import PropTypes from "prop-types";

// Modal component for adding a new birthday
const NewBirthdayModal = ({ selectedDate, onClose, onCreate }) => {
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
    <div className="new-birthday-modal-overlay">
      <div className="new-birthday-modal">
        <h2>Add Birthday</h2>
        <p>Date: {selectedDate.toDateString()}</p>

        <input
          type="text"
          className="new-birthday-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          className="new-birthday-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
        />

        {error && <p className="error">{error}</p>}

        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

// Define prop types for the component to ensure correct usage
NewBirthdayModal.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

// Export the component for use in other parts of the application
export default NewBirthdayModal;
