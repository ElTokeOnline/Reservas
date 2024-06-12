const router = require('express').Router();
const Reservation = require('../models/Reservation');
const verifyToken = require('../middleware/verifyToken');

// Create a new reservation
router.post('/', verifyToken, async (req, res) => {
  // Reservation logic
});

// Get reservations
router.get('/', verifyToken, async (req, res) => {
  // Get reservations logic
});

module.exports = router;
