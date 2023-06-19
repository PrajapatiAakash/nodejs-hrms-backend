const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
};

exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Generate JWT
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_TIMEOUT || '1h',
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
};