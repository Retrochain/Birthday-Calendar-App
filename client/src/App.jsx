import { useEffect, useState } from "react";
import supabase from "./apis/supabaseClient.js";

import CalendarGrid from "./components/calendar/CalendarGrid.jsx";
import EditBirthdayButtons from "./components/birthday-components/EditBirthdayButtons";
import UpcomingBirthdays from "./components/birthday-components/UpcomingBirthdays";
import AllBirthdaysList from "./components/birthday-components/AllBirthdaysList";
import AuthModal from "./components/auth/AuthModal.jsx";

function App() {
  // State to hold the current authenticated user
  const [user, setUser] = useState(null);

  // useEffect hook to check for an authenticated user on component mount and set up an authentication state change listener
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Set up a listener for authentication state changes to update the user state accordingly
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    // Clean up the authentication state change listener when the component unmounts
    return () => listener.subscription.unsubscribe();
  }, []);

  // If there is no authenticated user, render the AuthModal component to prompt for login or registration
  if (!user) {
    return <AuthModal />;
  }

  // If there is an authenticated user, render the main application components including the logout button,calendar grid, birthday management buttons, and lists of upcoming and all birthdays
  return (
    <div className="main-container">
      <button className="logout-button" onClick={() => supabase.auth.signOut()}>
        Logout
      </button>
      <CalendarGrid />
      <EditBirthdayButtons />
      <UpcomingBirthdays />
      <AllBirthdaysList />
    </div>
  );
}

export default App;