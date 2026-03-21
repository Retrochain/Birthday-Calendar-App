// This file sets up the Express application, including middleware for CORS and JSON parsing, and defines a simple route for testing the server.
import express from "express";
import cors from "cors";

// Create an instance of the Express application
const app = express();

// Use CORS middleware to allow cross-origin requests and JSON middleware to parse incoming JSON request bodies
app.use(cors());
app.use(express.json());

// Define a simple route for the root URL that responds with "Hello, World!" when accessed
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Export the Express app for use in other parts of the application, such as the server entry point
export default app