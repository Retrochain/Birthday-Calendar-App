import React from "react";
import CalendarGrid from "./components/CalendarGrid";
import EditBirthdayButtons from "./components/birthday-components/EditBirthdayButtons";
import UpcomingBirthdays from "./components/birthday-components/UpcomingBirthdays";
import AllBirthdaysList from "./components/birthday-components/AllBirthdaysList";

function App() {
  return (
    <div className="main-container">
      <CalendarGrid />
      <EditBirthdayButtons />
      <UpcomingBirthdays />
      <AllBirthdaysList />
    </div>
  );
}

export default App;