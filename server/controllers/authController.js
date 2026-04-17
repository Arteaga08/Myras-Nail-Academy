import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import AdminUser from '../models/AdminUser.js';

const MAX_ADMIN_LOGIN_ATTEMPTS = 5;
const ADMIN_LOCK_DURATION_MS = 15 * 60 * 1000;

const generateToken = (id, role) => {
  const expiresIn =
    role === 'admin'
      ? process.env.JWT_EXPIRES_IN_ADMIN || '1d'
      : process.env.JWT_EXPIRES_IN_STUDENT || '7d';
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn });
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('A user with that email already exists');
  }

  const user = await User.create({ firstName, lastName, email, password });
  const token = generateToken(user._id, 'student');

  res.status(201).json({
    status: 'success',
    data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    },
  });
});

// @desc    Login student
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id, 'student');

  res.status(200).json({
    status: 'success',
    data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    },
  });
});

// @desc    Get current logged-in student
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
  });
});

// @desc    Update current student profile
// @route   PUT /api/auth/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
  const allowed = ['firstName', 'lastName', 'bio', 'profilePicture'];
  const updates = {};
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    returnDocument: 'after',
    runValidators: true,
  });

  res.status(200).json({ status: 'success', data: user });
});

// @desc    Login admin
// @route   POST /api/admin/auth/login
// @access  Public
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const admin = await AdminUser.findOne({ email }).select('+password');

  // Return generic error for unknown emails (no user enumeration)
  if (!admin) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Check lockout before validating password
  if (admin.lockedUntil && admin.lockedUntil > new Date()) {
    const retrySeconds = Math.ceil((admin.lockedUntil.getTime() - Date.now()) / 1000);
    res.set('Retry-After', String(retrySeconds));
    res.status(429);
    throw new Error(`Account locked. Try again in ${retrySeconds} seconds.`);
  }

  const passwordMatch = await admin.matchPassword(password);

  if (!passwordMatch) {
    admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1;
    if (admin.failedLoginAttempts >= MAX_ADMIN_LOGIN_ATTEMPTS) {
      admin.lockedUntil = new Date(Date.now() + ADMIN_LOCK_DURATION_MS);
      await admin.save({ validateBeforeSave: false });
      res.set('Retry-After', String(Math.ceil(ADMIN_LOCK_DURATION_MS / 1000)));
      res.status(429);
      throw new Error('Too many failed attempts. Account locked for 15 minutes.');
    }
    await admin.save({ validateBeforeSave: false });
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Successful login — reset counters and stamp lastLogin
  admin.failedLoginAttempts = 0;
  admin.lockedUntil = null;
  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  const token = generateToken(admin._id, 'admin');

  res.status(200).json({
    status: 'success',
    data: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token,
    },
  });
});

// @desc    Change student password
// @route   PUT /api/auth/me/password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error('Please provide current and new password');
  }

  const user = await User.findById(req.user._id).select('+password');
  if (!user || !(await user.matchPassword(currentPassword))) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ status: 'success', message: 'Password updated successfully' });
});

export { register, login, getMe, updateMe, changePassword, adminLogin };
