// This custom hook manages the state and API interactions for birthdays, providing a clean interface for components to use.
import { useState, useEffect, useCallback, useMemo } from "react";
import { apiRequest } from "../utils/RequestHelper";

// Custom hook to manage birthdays data and API interactions
export const useBirthdays = (userId) => {
  // State variables to hold birthdays, loading status, and any errors
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET - Function to fetch all birthdays from the API
  // useCallback is used to memoize the function, preventing unnecessary re-creations on re-renders
  const fetchBirthdays = useCallback(async () => {
    // Set loading state and clear any previous errors
    setLoading(true);
    setError(null);

    // Make an API request to get the list of birthdays
    try {
      // Await the response and update the birthdays state with the data from the response
      const response = await apiRequest({
        method: "get",
        url: "/api/birthdays",
      });

      // Update the birthdays state with the data received from the API
      setBirthdays(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // POST - Function to add a new birthday via the API
  // useCallback is used to memoize the function, and it depends on fetchBirthdays to refresh the list after adding a new birthday
  const addBirthday = useCallback(
    async ({ name, note, birthdate }) => {
      // Clear any previous errors before making the API request
      setError(null);

      // Make an API request to create a new birthday
      try {
        // Await the response from the API after creating the birthday
        await apiRequest({
          method: "post",
          url: "/api/birthdays",
          data: { name, note, birthdate },
        });

        // After successfully adding a birthday, fetch the updated list of birthdays to reflect the new addition
        fetchBirthdays();
      } catch (err) {
        setError(err.message);
      }
    },
    [fetchBirthdays],
  ); // Dependency array includes fetchBirthdays to ensure it is updated if fetchBirthdays changes

  // PUT - Function to update an existing birthday via the API
  // useCallback is used to memoize the function, and it depends on fetchBirthdays to refresh the list after updating a birthday
  const updateBirthday = useCallback(
    async (id, updatedData) => {
      // Clear any previous errors before making the API request
      setError(null);

      // Make an API request to update the birthday with the specified ID
      try {
        // Await the response from the API after updating the birthday
        await apiRequest({
          method: "put",
          url: `/api/birthdays/${id}`,
          data: updatedData,
        });

        // After successfully updating a birthday, fetch the updated list of birthdays to reflect the changes
        fetchBirthdays();
      } catch (err) {
        setError(err.message);
      }
    },
    [fetchBirthdays], // Dependency array includes fetchBirthdays to ensure it is updated if fetchBirthdays changes
  );

  // DELETE - Function to delete a birthday via the API
  // useCallback is used to memoize the function, and it depends on fetchBirthdays to refresh the list after deleting a birthday
  const deleteBirthday = useCallback(
    async (id) => {
      // Clear any previous errors before making the API request
      setError(null);

      // Make an API request to delete the birthday with the specified ID
      try {
        // Await the response from the API after deleting the birthday
        await apiRequest({ method: "delete", url: `/api/birthdays/${id}` });

        // After successfully deleting a birthday, fetch the updated list of birthdays to reflect the changes
        fetchBirthdays();
      } catch (err) {
        setError(err.message);
      }
    },
    [fetchBirthdays], // Dependency array includes fetchBirthdays to ensure it is updated if fetchBirthdays changes
  );

  // Method to get the birthdays in the current month that gets calculated between renders
  const upcomingBirthdays = useMemo(() => {
    const currentMonth = new Date().getMonth() + 1;

    return birthdays
      .filter((b) => new Date(b.birthdate).getUTCMonth() + 1 === currentMonth)
      .sort((a, b) => new Date(a.birthdate) - new Date(b.birthdate));
  }, [birthdays]);

  // useEffect to fetch birthdays when the component using this hook mounts
  useEffect(() => {
    if (userId) fetchBirthdays();
  }, [fetchBirthdays, userId]);

  // Return the state variables and functions for managing birthdays, allowing components to easily access and manipulate birthday data
  return {
    birthdays,
    loading,
    error,
    fetchBirthdays,
    addBirthday,
    updateBirthday,
    deleteBirthday,
    upcomingBirthdays,
  };
};
