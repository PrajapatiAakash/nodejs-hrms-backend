const User = require('../models/User');
const { ObjectId } = require('mongodb');
const tokenManager = require('./../tokenManager');

exports.profile = async (req, res) => {
    try {
      // Find the user by username
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      const userId = req.user.userId;
      const user = await User.findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
};

exports.logout = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = req.headers.authorization;
    tokenManager.addToBlacklist(token);

    res.status(200).json({message: 'User successfully logged out'});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}