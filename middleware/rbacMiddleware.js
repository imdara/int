// rbacMiddleware.js

import User from '../models/User.js';

// Middleware to check for roles
const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const userId = req.user._id; // Access user from authenticated request
      const user = await User.findById(userId).select('role');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('RBAC error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};

export default checkRole;
