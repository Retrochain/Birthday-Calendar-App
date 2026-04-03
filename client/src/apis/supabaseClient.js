// This file initializes and exports the Supabase client for use in other parts of the application
// Import the createClient function from the Supabase JavaScript library
import { createClient } from "@supabase/supabase-js";

// Retrieve the Supabase URL and API key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

// Create a Supabase client instance using the URL and API key
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the Supabase client for use in other components and modules
export default supabase;