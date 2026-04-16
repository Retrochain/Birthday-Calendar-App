import { useState } from "react";
import PropTypes from "prop-types";

// Modal for confirming deletion of a birthday entry
const DeleteBirthdayModal = ({ birthday, onClose, onDelete, theme }) => {
  // Local state for handling errors and delete state during deletion
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Function to handle the deletion process
  const handleDelete = async () => {
    // Reset error state and set loading to true
    setError(null);
    setDeleting(true);

    // Attempt to delete the birthday entry using the provided onDelete function
    try {
      // Await the deletion process and then close the modal
      await onDelete(birthday.id);

      // If successful, close the modal
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete birthday");
      setDeleting(false);
    }
  };

  // Render the modal with the birthday details and action buttons
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className={`${theme.container} w-full max-w-md p-6 rounded-xl shadow-xl`}
      >
        <h2 className="text-2xl font-semibold mb-3">Delete Birthday</h2>

        <p className="mb-4 text-xl">
          Are you sure you want to delete{" "}
          <strong className="capitalize">{birthday.name}</strong>’s birthday on{" "}
          {new Date(birthday.birthdate).toDateString()}?
        </p>

        {error && <p className="mb-3">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            className={`${theme.buttonPrimary} px-3 py-1 rounded font-semibold text-xl ${deleting ? "disabled:opacity-50 cursor-not-allowed" : ""}`}
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>

          <button
            className={`${theme.buttonSecondary} px-3 py-1 rounded font-semibold text-xl ${deleting ? "disabled:opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
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

  theme: PropTypes.shape({
    container: PropTypes.string,
    buttonPrimary: PropTypes.string,
    buttonSecondary: PropTypes.string,
  }).isRequired,
};

// Export the component for use in other parts of the application
export default DeleteBirthdayModal;
