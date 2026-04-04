// This helper centralizes API requests with authentication, using Supabase for session management and Axios for HTTP requests. 
// It provides a single function, `apiRequest`, that components can use to make authenticated API calls without worrying about token management. 
// The `withAuth` function retrieves the current session's access token and passes it to the provided callback, which performs the actual API request. 
// This keeps the authentication logic separate from the components, making them cleaner and easier to maintain.
import supabase from "../apis/supabaseClient.js";
import axios from "axios";

// Helper function to wrap API calls with authentication
const withAuth = async (callback) => {
  // Get the current session and extract the access token
  try {
    // Get the current session from Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Check if the session and access token exist
    const token = session?.access_token;
    if (!token) throw new Error("No auth token found");

    // Call the provided callback with the token and return its result
    return await callback(token);
  } catch (err) {
    console.error("Auth error:", err);
    throw err;
  }
};

// Main function to make authenticated API requests
export const apiRequest = async ({ method, url, data }) => {
  // Use the withAuth helper to get the token and make the API request
  return withAuth((token) =>
    axios({ method, url, data, headers: { Authorization: `Bearer ${token}` } }),
  );
};

// Export the apiRequest function for use in components and hooks
export default apiRequest;