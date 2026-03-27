// This file contains the controller functions for managing birthday data.
// Each function corresponds to a specific CRUD operation (Create, Read, Update, Delete) and interacts with the database to perform the necessary actions.
// The functions are designed to handle HTTP requests and send appropriate responses back to the client.
import supabase from "../db/database.js";

// GET /birthdays - Retrieve all birthdays from the database, ordered by birthdate
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

// GET /birthdays/:id - Retrieve a specific birthday by its ID from the database
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

// POST /birthdays - Create a new birthday entry in the database
const createBirthday = async (req, res) => {
  // Validate and save birthday to database
  try {
    // Extract the name, birthdate, and note from the request body
    const { name, birthdate, note } = req.body;

    // Validate that the name and birthdate are provided in the request body
    if (!name || !birthdate) {
      // If either the name or birthdate is missing, return a 400 Bad Request response with an error message
      return res.status(400).json({ error: "name and birthdate are required" });
    }

    // Check if a birthday for this person already exists
    const { data: existing } = await supabase
      .from("birthdays")
      .select("id")
      .eq("name", name)
      .single();

    if (existing) {
      return res
        .status(409)
        .json({ error: "Birthday for this person already exists" });
    }

    // Use Supabase client to insert a new record into the "birthdays" table with the provided name, birthdate, and note
    const { data, error } = await supabase
      .from("birthdays")
      .insert([{ name, birthdate, note }])
      .select()
      .single();

    // If there is an error during the database insertion, return a 500 Internal Server Error response with the error message
    if (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error: " + error.message });
    }

    // If the insertion is successful, return the created birthday data as a JSON response.
    res.json({ data });
  } catch (error) {
    // If there is an error during the process, catch it in the catch block
    // Return a 500 Internal Server Error response with the error message
    return res
      .status(500)
      .json({ error: "Internal Server Error " + error.message });
  }
};

// PUT /birthdays/:id - Update an existing birthday entry in the database using the ID from the request parameters.
const updateBirthday = async (req, res) => {
  // Update birthday in database
  try {
    // Extract the ID parameter from the request URL and the name, birthdate, and note from the request body
    const { id } = req.params;
    const { name, birthdate, note } = req.body;

    // Validate that the name and birthdate are provided in the request body
    if (!name || !birthdate) {
      // If either the name or birthdate is missing, return a 400 Bad Request response with an error message
      return res.status(400).json({ error: "name and birthdate are required" });
    }

    // Use Supabase client to update the record in the "birthdays" table where the "id" column matches the provided ID, setting the new name, birthdate, and note values
    const { data, error } = await supabase
      .from("birthdays")
      .update({ name, birthdate, note })
      .eq("id", id)
      .select()
      .single();

    // If there is an error during the database update, return a 500 Internal Server Error response with the error message
    if (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error: " + error.message });
    }

    // If the update is successful, return the updated birthday data as a JSON response
    res.json({ data });
  } catch (error) {
    // If there is an error during the process, catch it in the catch block
    // Return a 500 Internal Server Error response with the error message
    return res
      .status(500)
      .json({ error: "Internal Server Error " + error.message });
  }
};

// DELETE /birthdays/:id - Delete a birthday entry from the database using the ID from the request parameters.
const deleteBirthday = async (req, res) => {
  // Delete birthday from database
  try {
    // Extract the ID parameter from the request URL
    const { id } = req.params;

    // Use Supabase client to delete the record from the "birthdays" table where the "id" column matches the provided ID
    const { data, error } = await supabase
      .from("birthdays")
      .delete()
      .eq("id", id);

    // If there is an error during the database deletion, return a 500 Internal Server Error response with the error message
    if (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error: " + error.message });
    }

    // If the deletion is successful, return a success message as a JSON response
    res.json({ data });
  } catch (error) {
    // If there is an error during the process, catch it in the catch block
    // Return a 500 Internal Server Error response with the error message
    return res
      .status(500)
      .json({ error: "Internal Server Error " + error.message });
  }
};

// Export the controller functions for use in the routes
export {
  getAllBirthdays,
  getBirthdayById,
  createBirthday,
  updateBirthday,
  deleteBirthday,
};
