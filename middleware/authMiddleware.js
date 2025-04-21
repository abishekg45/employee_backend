const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting Bearer <token>

  if (!token) {
    return res.status(401).json({ status: 'failed', message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Optional: use this for logged-in user info
    next();
  } catch (err) {
    return res.status(403).json({ status: 'failed', message: 'Invalid token' });
  }
};

module.exports = verifyToken;
