import PropTypes from "prop-types";

// Function to handle the Add Birthday click event
function AddBirthday() {
  return console.log("Add Birthday button clicked");
}

// Function to handle the Edit Birthday click event
function EditBirthday() {
  return console.log("Edit Birthday button clicked");
}

// Function to handle the Delete Birthday click event
function DeleteBirthday() {
  return console.log("Delete Birthday button clicked");
}

// React component that renders buttons for adding, editing, and deleting birthdays, with corresponding click event handlers
const EditBirthdayButtons = ({ selectedDate }) => {
  return (
    <div className="birthday-btns">
      <p className="temp">Selected Date: {selectedDate.toDateString()}</p>
      <button className="add-birthday-btn" onClick={AddBirthday}>
        Add Birthday
      </button>
      <button className="edit-birthday-btn" onClick={EditBirthday}>
        Edit Birthday
      </button>
      <button className="delete-birthday-btn" onClick={DeleteBirthday}>
        Delete Birthday
      </button>
    </div>
  );
};

EditBirthdayButtons.propTypes = {
  // Prop type validation for the selectedDate prop, which should be an instance of Date and is required for the component to function properly
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

// Export the EditBirthdayButtons component as the default export of this module
export default EditBirthdayButtons;