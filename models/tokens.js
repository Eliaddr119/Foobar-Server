import jwt from 'jsonwebtoken';

function generateToken(username) {
  // Generate the token using the user and password
  const token = jwt.sign({ username }, 'foo', { expiresIn: '4h' });
  return token;
}

export {
  generateToken
}
