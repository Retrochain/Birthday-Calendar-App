// This file defines an authentication middleware function for an Express.js application that uses Supabase for authentication.
// The middleware checks for a Bearer token in the Authorization header of incoming requests, verifies the token with Supabase,
// and attaches the authenticated user information to the request object if the token is valid.
// If the token is missing or invalid, it responds with a 401 Unauthorized status and an appropriate error message.
import supabase from "../db/database.js";

// Middleware function to authenticate requests using Supabase
const authMiddleware = async (req, res, next) => {
  // Extract the Authorization header from the incoming request
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and starts with "Bearer "
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Extract the token from the Authorization header by splitting the string and taking the second part
  const token = authHeader.split(" ")[1];

  // Use the Supabase client to get the user information associated with the provided token
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  // If there is an error during the token verification or if the user is not found, respond with a 401 Unauthorized status and an appropriate error message
  if (error || !user) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
  // If the token is valid and the user is authenticated, attach the user information to the request object for use in subsequent middleware or route handlers
  req.user = user;
  next();
};

// Export the authentication middleware function for use in other parts of the application.
export default authMiddleware;