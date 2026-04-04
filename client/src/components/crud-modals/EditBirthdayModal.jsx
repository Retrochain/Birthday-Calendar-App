import { useState } from "react";
import PropTypes from "prop-types";

// Modal for editing an existing birthday entry
const EditBirthdayModal = ({ birthday, onClose, onUpdate }) => {
  // Local state for form fields and error handling
  const [name, setName] = useState(birthday.name);
  const [birthdate, setBirthdate] = useState(birthday.birthdate);
  const [note, setNote] = useState(birthday.note);
  const [error, setError] = useState(null);

  // Handle saving the updated birthday entry
  const handleSave = async () => {
    // Basic validation: ensure name is not empty
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    // Attempt to update the birthday entry via the provided onUpdate function
    try {
      await onUpdate(birthday.id, { name, birthdate, note });
      
      // Close the modal on successful update
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update birthday");
    }
  };

  // Render the modal with form fields and buttons
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Birthday</h2>
        <p>Date: {new Date(birthday.birthdate).toDateString()}</p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
        />
        <input
          type="text"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          placeholder={birthday.birthdate}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

// Define prop types for the component
EditBirthdayModal.propTypes = {
  birthday: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    note: PropTypes.string,
    birthdate: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// Export the component for use in other parts of the application
export default EditBirthdayModal;