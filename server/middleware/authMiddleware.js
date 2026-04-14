import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import AdminUser from '../models/AdminUser.js';

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

// Attach user to req if token present, but don't block if missing
const optionalProtect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next();

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.role === 'admin'
      ? await AdminUser.findById(decoded.id).select('-password')
      : await User.findById(decoded.id).select('-password');
    if (req.user) req.user.role = decoded.role;
  } catch {
    // Invalid token — continue as unauthenticated
  }
  next();
});

export { protect, adminOnly, optionalProtect };
