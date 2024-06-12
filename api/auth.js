const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  // Registration logic
});

// Login
router.post('/login', async (req, res) => {
  // Login logic
});

module.exports = router;
