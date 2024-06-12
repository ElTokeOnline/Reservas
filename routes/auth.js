const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  // Register logic
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  // Login logic
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email or password is wrong');
  
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');
  
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
