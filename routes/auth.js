const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  // your registration logic
});

// Login
router.post('/login', async (req, res) => {
  // your login logic
});

module.exports = router;
