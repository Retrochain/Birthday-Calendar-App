import express from "express";
// Import controller functions for handling birthday-related requests
import {
  getAllBirthdays,
  createBirthday,
  updateBirthday,
  deleteBirthday,
} from "../controllers/birthdayController.js";
// Import authentication middleware to protect the routes
import authMiddleware from "../middleware/supabaseAuth.js";

const router = express.Router();

// Apply auth middleware to all birthday routes
router.use(authMiddleware);

// GET all birthdays
router.get("/", getAllBirthdays);

// POST a new birthday
router.post("/", createBirthday);

// PUT update a birthday
router.put("/:id", updateBirthday);

// DELETE a birthday
router.delete("/:id", deleteBirthday);

// Export the router to be used in the main app file
export default router;