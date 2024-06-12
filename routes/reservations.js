const router = require('express').Router();
const Reservation = require('../models/Reservation');
const verifyToken = require('../middleware/verifyToken');
const Joi = require('joi');

// Esquema de validación para reservas
const reservationSchema = Joi.object({
    date: Joi.date().required(),
    time: Joi.string().required()
});

// Crear una nueva reserva
router.post('/', verifyToken, async (req, res) => {
    const { error } = reservationSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const newReservation = new Reservation({
        userId: req.user._id,
        date: req.body.date,
        time: req.body.time
    });
    try {
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Obtener todas las reservas del usuario autenticado
router.get('/', verifyToken, async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.user._id });
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Actualizar una reserva existente
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            {
                date: req.body.date,
                time: req.body.time
            },
            { new: true }
        );
        res.status(200).json(updatedReservation);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Eliminar una reserva existente
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json('Reservation has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
