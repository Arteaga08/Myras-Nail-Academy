const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const AdminUser = require('../models/AdminUser');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
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
  if (!admin || !(await admin.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Update last login timestamp
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

module.exports = { register, login, getMe, adminLogin };
