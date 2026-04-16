import { useState } from "react";
import PropTypes from "prop-types";
import NewBirthdayModal from "../crud-modals/NewBirthdayModal";

// Component for the "Add Birthday" button and modal
const CreateBirthdayButton = ({
  selectedDate,
  addBirthday,
  onAdded,
  theme,
}) => {
  // State to control the visibility of the create birthday modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  // Handler for creating a new birthday
  const handleCreate = async (name, note, birthdate) => {
    // Call the addBirthday function passed as a prop to create a new birthday
    try {
      // Send the new birthday information
      await addBirthday({
        name,
        note,
        birthdate,
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
    <div className="container mx-auto">
      <h1
        className={`${theme.title} font-bebas text-5xl items-center justify-center pl-2`}
      >
        Add A Birthday!
      </h1>
      <button
        className={`${theme.buttonPrimary} text-2xl font-semibold px-3 py-2 rounded-lg m-2`}
        onClick={() => setShowCreateModal(true)}
      >
        Add Birthday
      </button>

      {/* Render the NewBirthdayModal component when showCreateModal is true */}
      {showCreateModal && (
        <NewBirthdayModal
          selectedDate={selectedDate}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          theme={theme}
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

  theme: PropTypes.shape({
    title: PropTypes.string,
    buttonPrimary: PropTypes.string,
    noNote: PropTypes.string.isRequired,
  }),
};

// Export the CreateBirthdayButton component as the default export
export default CreateBirthdayButton;
