// This file initializes the Supabase client using environment variables for the URL and key, and exports the client for use in other parts of the application.
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create a Supabase client using the URL and key from environment variables
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the Supabase client for use in other parts of the application
export default supabase;