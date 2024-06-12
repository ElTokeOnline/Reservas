const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const Reservation = require('../models/Reservation');

// Create a new reservation
router.post('/', verifyToken, async (req, res) => {
  const reservation = new Reservation({
    userId: req.user._id,
    date: req.body.date,
    time: req.body.time,
  });

  try {
    const savedReservation = await reservation.save();
    res.send(savedReservation);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all reservations for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user._id });
    res.send(reservations);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
