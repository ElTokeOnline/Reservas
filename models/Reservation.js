const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
