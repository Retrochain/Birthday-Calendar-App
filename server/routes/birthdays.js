import express from 'express';

const router = express.Router();

// GET all birthdays
router.get('/', (req, res) => {
    // Fetch all birthdays from database
    res.json({ birthdays: [] });
});

// GET a specific birthday by ID
router.get('/:id', (req, res) => {
    // Fetch birthday by ID from database
    res.json({ birthday: {} });
});

// POST a new birthday
router.post('/', (req, res) => {
    // Validate and save birthday to database
    res.status(201).json({ message: 'Birthday created', birthday: {} });
});

// PUT update a birthday
router.put('/:id', (req, res) => {
    // Update birthday in database
    res.json({ message: 'Birthday updated', birthday: {} });
});

// DELETE a birthday
router.delete('/:id', (req, res) => {
    // Delete birthday from database
    res.json({ message: 'Birthday deleted' });
});

export default router;