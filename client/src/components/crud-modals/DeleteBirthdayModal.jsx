import { useState } from "react";
import PropTypes from "prop-types";

// Modal for confirming deletion of a birthday entry
const DeleteBirthdayModal = ({ birthday, onClose, onDelete }) => {
  // Local state for handling errors and loading state during deletion
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle the deletion process
  const handleDelete = async () => {
    // Reset error state and set loading to true
    setError(null);
    setLoading(true);

    // Attempt to delete the birthday entry using the provided onDelete function
    try {
      // Await the deletion process and then close the modal
      await onDelete(birthday.id);
      
      // If successful, close the modal
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete birthday");
      setLoading(false);
    }
  };

  // Render the modal with the birthday details and action buttons
  return (
    <div className="delete-birthday-modal-overlay">
      <div className="delete-birthday-modal">
        <h2>Delete Birthday</h2>
        <p>
          Are you sure you want to delete <strong>{birthday.name}</strong>’s
          birthday on {new Date(birthday.birthdate).toDateString()}?
        </p>

        {error && <p className="delete-birthday-error">{error}</p>}

        <button className="delete-birthday-cancel-button" onClick={onClose} disabled={loading}>
          Cancel
        </button>
        <button className="delete-birthday-save-button" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

// Define PropTypes for the component to ensure correct usage
DeleteBirthdayModal.propTypes = {
  birthday: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// Export the component for use in other parts of the application
export default DeleteBirthdayModal;