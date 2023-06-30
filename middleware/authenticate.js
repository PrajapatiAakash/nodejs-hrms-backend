const jwt = require('jsonwebtoken');
const tokenManager = require('./../tokenManager');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization failed' });
  }

  // Check if the token is blacklisted
  if (tokenManager.isTokenBlacklisted(token)) {
    return res.status(401).json({ error: 'Token has been expired.' });
  }

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the user to the request object
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authorization failed' });
  }
};

module.exports = authenticate;
