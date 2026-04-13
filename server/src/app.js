// This file sets up the Express application, including middleware for CORS and JSON parsing, and defines a simple route for testing the server.
import express from "express";
import cors from "cors";

// Import the birthdays router, which contains routes for managing birthday data
import birthdaysRouter from "./routes/birthdays.js";

// Create an instance of the Express application
const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

// Use CORS middleware to allow cross-origin requests and JSON middleware to parse incoming JSON request bodies
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());

// Use the birthdays router for any routes that start with /birthdays
app.use("/api/birthdays", birthdaysRouter);

// Define a simple route for the root URL that responds with "Hello, World!" when accessed
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Export the Express app for use in other parts of the application, such as the server entry point
export default app;
