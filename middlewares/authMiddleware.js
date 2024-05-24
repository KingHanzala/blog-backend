require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Unauthorized');
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
};
