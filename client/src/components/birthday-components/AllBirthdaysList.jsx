import axios from "axios";
import React, { useState, useEffect } from "react";

// React component that displays a list of all birthdays for the current user
const AllBirthdaysList = () => {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/birthdays/", {
        headers: {
          Authorization: `Bearer `},
      })
      .then((response) => {
        setBirthdays(response.data.data);
        console.log("Fetched birthdays:", response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching birthdays:", error);
      });
  }, []);

  return (
    <div className="all-birthdays">
      <h1 className="list-title">All Birthdays</h1>
      {birthdays.map((birthday) => (
        <div key={birthday.id} className="birthday-item">
          {birthday.name} - {birthday.birthdate}
        </div>
      ))}
    </div>
  );
};

// Export the AllBirthdaysList component as the default export of this module
export default AllBirthdaysList;
