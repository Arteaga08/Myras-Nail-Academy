const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const AdminUser = require('../models/AdminUser');

// Verify JWT and attach user to req.user
const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }

  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role === 'admin') {
    req.user = await AdminUser.findById(decoded.id).select('-password');
  } else {
    req.user = await User.findById(decoded.id).select('-password');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, user not found');
  }

  req.user.role = decoded.role;
  next();
});

// Only allow admin users
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403);
  throw new Error('Not authorized, admin access required');
};

module.exports = { protect, adminOnly };
