// This file is the entry point of the server application. It loads environment variables, imports the Express app, and starts the server on the specified port.
import "dotenv/config";
import app from "./app.js";

// Use the PORT environment variable if available, otherwise default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port, logging a message to the console when it's running
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});