const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    console.log('Register endpoint hit');
    try {
        const salt = await bcrypt.genSalt(10);
        console.log('Salt generated');
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log('Password hashed');
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const user = await newUser.save();
        console.log('User saved:', user);
        res.status(201).json(user);
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    console.log('Login endpoint hit');
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json("Wrong credentials!");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            console.log('Invalid password');
            return res.status(400).json("Wrong credentials!");
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        console.log('Token generated:', token);
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json(err);
    }
});

module.exports = router;
