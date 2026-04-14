import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import AuditLog from '../models/AuditLog.js';

// @desc    Get all students
// @route   GET /api/admin/users
// @access  Admin
const getUsers = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  const [total, users] = await Promise.all([
    User.countDocuments(),
    User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);

  res.status(200).json({
    status: 'success',
    data: users,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

// @desc    Get single student detail
// @route   GET /api/admin/users/:id
// @access  Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const enrollments = await Enrollment.find({ userId: user._id }).populate(
    'courseId',
    'title thumbnail'
  );

  res.status(200).json({ status: 'success', data: { user, enrollments } });
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Admin
const getAdminOrders = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  const [total, orders] = await Promise.all([
    Payment.countDocuments(),
    Payment.find()
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
  ]);

  res.status(200).json({
    status: 'success',
    data: orders,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const [revenueStats, totalStudents, totalCourses, recentEnrollments, courseBreakdown] =
    await Promise.all([
      Payment.aggregate([
        { $match: { status: 'paid' } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$amount' },
            totalOrders: { $sum: 1 },
          },
        },
      ]),
      User.countDocuments(),
      Course.countDocuments({ isPublished: true }),
      Enrollment.find()
        .populate('userId', 'firstName lastName email')
        .populate('courseId', 'title')
        .sort({ enrolledAt: -1 })
        .limit(5),
      Enrollment.aggregate([
        {
          $group: {
            _id: '$courseId',
            enrollmentCount: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'courses',
            localField: '_id',
            foreignField: '_id',
            as: 'course',
          },
        },
        { $unwind: '$course' },
        {
          $project: {
            title: '$course.title',
            enrollmentCount: 1,
          },
        },
        { $sort: { enrollmentCount: -1 } },
      ]),
    ]);

  res.status(200).json({
    status: 'success',
    data: {
      totalRevenue: revenueStats[0]?.totalRevenue ?? 0,
      totalOrders: revenueStats[0]?.totalOrders ?? 0,
      totalStudents,
      totalCourses,
      recentEnrollments,
      courseBreakdown,
    },
  });
});

// @desc    Get audit logs
// @route   GET /api/admin/audit
// @access  Admin
const getAuditLogs = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
  const skip = (page - 1) * limit;

  const [total, logs] = await Promise.all([
    AuditLog.countDocuments(),
    AuditLog.find().populate('adminId', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);

  res.status(200).json({
    status: 'success',
    data: logs,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

export { getUsers, getUserById, getAdminOrders, getDashboardStats, getAuditLogs };
