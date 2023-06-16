const crypto = require('crypto');

const generateSecretKey = () => {
  const secret = crypto.randomBytes(32).toString('hex');
  return secret;
};

const secretKey = generateSecretKey();
console.log('Generated Secret Key:', secretKey);
