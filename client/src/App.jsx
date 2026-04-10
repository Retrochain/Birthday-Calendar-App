import { useState } from "react";

import { useAuth } from "./hooks/useAuth.js";
import { useTheme } from "./hooks/useTheme.js";
import { useBirthdays } from "./hooks/useBirthdays.js";

import "./index.css";

import CalendarGrid from "./components/calendar/CalendarGrid";
import CreateBirthdayButton from "./components/birthday-components/CreateBirthdayButton";
import UpcomingBirthdays from "./components/birthday-components/UpcomingBirthdays";
import AllBirthdaysList from "./components/birthday-components/AllBirthdaysList";
import AuthModal from "./components/auth/AuthModal";
import ThemeSelector from "./components/themes/ThemeSelector";

import THEMES from "./utils/Themes.js";

function App() {
  // First get the user
  const user = useAuth();

  // Then get the theme
  const { theme, setTheme, themeButtonClass } = useTheme();

  // Set the current theme appropriately
  const currentTheme = THEMES[theme] || THEMES.default;

  // Set a selected date variable to track said selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Import all the useful functions and objects required from useBirthdays
  const {
    birthdays,
    loading,
    error,
    fetchBirthdays,
    addBirthday,
    updateBirthday,
    deleteBirthday,
    upcomingBirthdays,
  } = useBirthdays();

  // If user is not logged in then only show a login modal
  if (!user) return <AuthModal />;

  // Otherwise show all the componenets
  return (
    <div className="flex flex-col container mx-auto px-4">
      <h1
        className={`${currentTheme.title} flex flex-row text-left mt-8 uppercase text-7xl font-bebas`}
      >
        Birthday
        <br />
        Calendar
      </h1>

      <ThemeSelector
        theme={theme}
        setTheme={setTheme}
        themeButtonClass={themeButtonClass}
      />

      <div className="flex flex-col sm:flex-row justify-between mt-10 gap-4">
        <CalendarGrid
          setSelectedDate={setSelectedDate}
          upcomingBirthdays={birthdays}
          theme={currentTheme}
        />

        <div className="flex flex-col gap-4 p-4 pt-0">
          <CreateBirthdayButton
            selectedDate={selectedDate}
            addBirthday={addBirthday}
            onAdded={fetchBirthdays}
            theme={currentTheme}
          />

          <UpcomingBirthdays
            birthdays={upcomingBirthdays}
            loading={loading}
            error={error}
            theme={currentTheme}
          />
        </div>
      </div>

      <div className="flex flex-col justify-content mt-8 p-4 pt-0">
        <AllBirthdaysList
          birthdays={birthdays}
          loading={loading}
          error={error}
          updateBirthday={updateBirthday}
          deleteBirthday={deleteBirthday}
          theme={currentTheme}
        />
      </div>
    </div>
  );
}

export default App;
