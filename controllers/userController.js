const User = require('../models/User');
const { ObjectId } = require('mongodb');

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