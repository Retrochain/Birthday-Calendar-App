import { useEffect, useState } from "react";
import supabase from "./apis/supabaseClient.js";
import { useBirthdays } from "./hooks/useBirthdays.js";

import CalendarGrid from "./components/calendar/CalendarGrid";
import CreateBirthdayButton from "./components/birthday-components/CreateBirthdayButton";
import UpcomingBirthdays from "./components/birthday-components/UpcomingBirthdays";
import AllBirthdaysList from "./components/birthday-components/AllBirthdaysList";
import AuthModal from "./components/auth/AuthModal";

function App() {
  // User state to manage authentication status
  const [user, setUser] = useState(null);
  // State to track the currently selected date in the calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Single instance of useBirthdays — shared across all components
  const {
    birthdays,
    loading,
    error,
    fetchBirthdays,
    addBirthday,
    updateBirthday,
    deleteBirthday,
  } = useBirthdays();

  // On component mount, check for authenticated user and set up auth state listener
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user || null),
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // If there is no authenticated user, show the authentication modal
  if (!user) return <AuthModal />;

  // getMonth() returns 0-11, so add 1 for 1-12
  const currentMonth = new Date().getMonth() + 1;
  // Filter upcoming birthdays client-side from the shared list
  const upcomingBirthdays = birthdays.filter((b) => {
    return new Date(b.birthdate).getUTCMonth() + 1 === currentMonth;
  });

  // Render the main application UI, passing necessary props to child components
  return (
    <div className="main-app-container">
      <CalendarGrid
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <CreateBirthdayButton
        selectedDate={selectedDate}
        addBirthday={addBirthday}
        onAdded={fetchBirthdays}
      />
      <UpcomingBirthdays
        birthdays={upcomingBirthdays}
        loading={loading}
        error={error}
      />
      <AllBirthdaysList
        birthdays={birthdays}
        loading={loading}
        error={error}
        updateBirthday={updateBirthday}
        deleteBirthday={deleteBirthday}
      />
    </div>
  );
}

// Export the App component as the default export for use in index.js
export default App;