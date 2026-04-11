import { useState, useEffect } from "react";
import supabase from "../apis/supabaseClient.js";

// This hook gets the current logged in user for authentication
export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user || null)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return user;
}