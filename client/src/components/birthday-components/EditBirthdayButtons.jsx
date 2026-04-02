import React from "react";

function AddBirthday() {
  return console.log("Add Birthday button clicked");
}
function EditBirthday() {
  return console.log("Edit Birthday button clicked");
}
function DeleteBirthday() {
  return console.log("Delete Birthday button clicked");
}

const EditBirthdayButtons = () => {
  return (
    <div className="birthday-btns">
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

export default EditBirthdayButtons;
