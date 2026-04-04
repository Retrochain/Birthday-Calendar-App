import { useState } from "react";
import PropTypes from "prop-types";
import NewBirthdayModal from "../crud-modals/NewBirthdayModal";


// Component for the "Add Birthday" button and modal
const CreateBirthdayButton = ({ selectedDate, addBirthday, onAdded }) => {
  // State to control the visibility of the create birthday modal
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Handler for creating a new birthday
  const handleCreate = async (name, note) => {
    // Call the addBirthday function passed as a prop to create a new birthday
    try {
      // Format the selected date to YYYY-MM-DD format
      await addBirthday({
        name,
        note,
        birthdate: selectedDate.toISOString().split("T")[0],
      });

      // Call the onAdded callback to refresh the birthday list and close the modal
      onAdded();

      // Close the create birthday modal
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating birthday:", error);
    }
  };

  // Render the "Add Birthday" button and the create birthday modal if showCreateModal is true
  return (
    <div className="birthday-btns">
      <button className="add-birthday-btn" onClick={() => setShowCreateModal(true)}>
        Add Birthday
      </button>

      {/* Render the NewBirthdayModal component when showCreateModal is true */}
      {showCreateModal && (
        <NewBirthdayModal
          selectedDate={selectedDate}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
};

// Define prop types for the CreateBirthdayButton component
CreateBirthdayButton.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  addBirthday: PropTypes.func.isRequired,
  onAdded: PropTypes.func.isRequired,
};

// Export the CreateBirthdayButton component as the default export
export default CreateBirthdayButton;