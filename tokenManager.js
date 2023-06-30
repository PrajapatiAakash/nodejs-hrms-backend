// Token blacklist
const tokenBlacklist = [];

// Add token to blacklist
function addToBlacklist(token) {
  tokenBlacklist.push(token);
}

// Check if token is blacklisted
function isTokenBlacklisted(token) {
  return tokenBlacklist.includes(token);
}

module.exports = {
  addToBlacklist,
  isTokenBlacklisted
};