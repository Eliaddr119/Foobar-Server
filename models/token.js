const jwt = require('jsonwebtoken');

function generateToken(user, password) {
  // Generate the token using the user and password
  const token = jwt.sign({ user, password }, 'secretKey', { expiresIn: '1h' });
  return token;
}

export {
    generateToken
}
