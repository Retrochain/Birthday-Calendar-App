import { useState } from "react";
import PropTypes from "prop-types";

// Modal for editing an existing birthday entry
const EditBirthdayModal = ({ birthday, onClose, onUpdate, theme }) => {
  // Local state for form fields and error handling
  const [name, setName] = useState(birthday.name);
  const [birthdate, setBirthdate] = useState(
    birthday.birthdate
      ? new Date(birthday.birthdate).toISOString().split("T")[0]
      : "",
  );
  const [note, setNote] = useState(birthday.note);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Handle saving the updated birthday entry
  const handleSave = async () => {
    // Basic validation: ensure name is not empty
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    // Attempt to update the birthday entry via the provided onUpdate function
    try {
      setSaving(true);

      await onUpdate(birthday.id, { name, birthdate, note });

      // Close the modal on successful update
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update birthday");
      setSaving(false);
    }
  };

  // Render the modal with form fields and buttons
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className={`${theme.container} w-full max-w-md p-6 rounded-xl shadow-xl`}
      >
        <h2 className="text-xl font-semibold mb-2">Edit Birthday</h2>

        <p className="mb-4 text-xl">
          Date: {new Date(birthday.birthdate + "T00:00:00").toDateString()}
        </p>

        <label htmlFor="name" className="block mb-1 text-xl font-semibold">
          Name
        </label>
        <input
          id="name"
          type="text"
          className={`${theme.grid} w-full p-2 mb-3 rounded text-xl capitalize`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <label htmlFor="note" className="block mb-1 text-xl font-semibold">
          Note
        </label>
        <input
          id="note"
          type="text"
          className={`${theme.grid} w-full p-2 mb-3 rounded text-xl`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
        />

        <label htmlFor="birthdate" className="block mb-1 text-xl font-semibold">
          Birthdate
        </label>
        <input
          id="birthdate"
          type="date"
          className={`${theme.grid} w-full p-2 mb-3 rounded text-xl`}
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />

        {error && <p className="mb-3 text-xl">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            className={`${theme.buttonPrimary} px-3 py-1 rounded font-semibold text-xl ${saving ? "disabled:opacity-50 cursor-not-allowed" : ""}`}
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            className={`${theme.buttonSecondary} px-3 py-1 rounded font-semibold text-xl ${saving ? "disabled:opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
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

  theme: PropTypes.shape({
    container: PropTypes.string,
    grid: PropTypes.string,
    cell: PropTypes.string,
    buttonPrimary: PropTypes.string,
    buttonSecondary: PropTypes.string,
  }).isRequired,
};

// Export the component for use in other parts of the application
export default EditBirthdayModal;
