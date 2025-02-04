// authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // Bearer token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    req.user = user; // Attach user info to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authenticate;
