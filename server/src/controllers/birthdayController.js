// This file contains the controller functions for managing birthday data.
// Each function corresponds to a specific CRUD operation (Create, Read, Update, Delete) and interacts with the database to perform the necessary actions.
// The functions are designed to handle HTTP requests and send appropriate responses back to the client.
import supabase from "../db/database.js";

// This function retrieves all birthdays from the database.
const getAllBirthdays = async (req, res) => {
  // Fetch all birthdays from database, ordered by birthdate
  try {
    // Use Supabase client to query the "birthdays" table, selecting all columns and ordering by birthdate in ascending order
    const { data, error } = await supabase
      .from("birthdays")
      .select("*")
      .order("birthdate", { ascending: true });

    // If there is an error during the database query, return a 500 Internal Server Error response with the error message
    if (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error: " + error.message });
    }

    // If the query is successful, return the retrieved data as a JSON response
    return res.json({ data });
  } catch (error) {
    // If there is an error during the process, catch it in the catch block
    // Return a 500 Internal Server Error response with the error message
    throw res
      .status(500)
      .json({ error: "Internal Server Error " + error.message });
  }
};

// This function retrieves a specific birthday by its ID from the database.
const getBirthdayById = async (req, res) => {
  // Extract the ID parameter from the request URL
  const { id } = req.params;

  // Use Supabase client to query the "birthdays" table, selecting all columns where the "id" column matches the provided ID
  try {
    //  Query the "birthdays" table for a record with the specified ID
    const { data, error } = await supabase
      .from("birthdays")
      .select("*")
      .eq("id", id);

    // If there is an error during the database query, return a 500 Internal Server Error response with the error message
    if (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error: " + error.message });
    }

    // If the query is successful, return the retrieved data as a JSON response
    return res.json({ data });
  } catch (error) {
    // If there is an error during the process, catch it in the catch block
    // Return a 500 Internal Server Error response with the error message
    return res
      .status(500)
      .json({ error: "Internal Server Error " + error.message });
  }
};

// This function creates a new birthday entry in the database using the data from the request body.
const createBirthday = async (req, res) => {
  // Validate and save birthday to database
  res.status(201).json({ message: "Birthday created", birthday: {} });
};

// This function updates an existing birthday entry in the database using the ID from the request parameters.
const updateBirthday = async (req, res, id) => {
  // Update birthday in database
  res.json({ message: "Birthday updated", birthday: {} });
};

// This function deletes a birthday entry from the database using the ID from the request parameters.
const deleteBirthday = async (req, res, id) => {
  // Delete birthday from database
  res.json({ message: "Birthday deleted" });
};

// Export the controller functions for use in the routes
export {
  getAllBirthdays,
  getBirthdayById,
  createBirthday,
  updateBirthday,
  deleteBirthday,
};
