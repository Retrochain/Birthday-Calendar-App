// This module provides a helper function to make authenticated API requests using Supabase for authentication and Axios for HTTP requests. 
// The withAuth function retrieves the current session and access token from Supabase, while the apiRequest function uses this token to make authenticated API calls.
import supabase from "../apis/supabaseClient.js";
import axios from "axios";

// Helper function to wrap API calls with authentication
const withAuth = async () => {
  // Get the current session and extract the access token
  try {
    // Get the current session from Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Check if the session and access token exist
    const token = session?.access_token;
    if (!token) throw new Error("No auth token found");

    // Return the access token for use in API requests
    return token;
  } catch (err) {
    console.error("Auth error:", err);
    throw err;
  }
};

// Main function to make authenticated API requests
export const apiRequest = async ({ method, url, data }) => {
  // Use the withAuth helper to get the token and make the API request
  const token = await withAuth();

  // Make the API request using Axios, including the Authorization header with the Bearer token
  return axios({ method, url, data, headers: { Authorization: `Bearer ${token}` } });
};

// Export the apiRequest function for use in components and hooks
export default apiRequest;