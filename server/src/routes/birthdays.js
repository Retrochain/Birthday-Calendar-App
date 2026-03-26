import express from 'express';
// Import controller functions for handling birthday-related requests
import { getAllBirthdays, getBirthdayById, createBirthday, updateBirthday, deleteBirthday } from '../controllers/birthdayController.js';

const router = express.Router();

// GET all birthdays
router.get("/", getAllBirthdays);

// GET a specific birthday by ID
router.get("/:id", getBirthdayById);

// POST a new birthday
router.post("/", createBirthday);

// PUT update a birthday
router.put("/:id", updateBirthday);

// DELETE a birthday
router.delete("/:id", deleteBirthday);

// Export the router to be used in the main app file
export default router;