const router = require('express').Router();
const Reservation = require('../models/Reservation');
const verifyToken = require('../middleware/verifyToken');

// Create a new reservation
router.post('/', verifyToken, async (req, res) => {
  // your reservation logic
});

// Get reservations
router.get('/', verifyToken, async (req, res) => {
  // your get reservations logic
});

module.exports = router;
