import asyncHandler from '../utils/asyncHandler.js';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import Enrollment from '../models/Enrollment.js';
import { createAuditLog } from '../services/auditService.js';

// ─── PUBLIC / STUDENT ────────────────────────────────────────────────────────

// @desc    Get all published courses
// @route   GET /api/courses
// @access  Public
const getPublishedCourses = asyncHandler(async (req, res) => {
  const { category, featured } = req.query;
  const filter = { isPublished: true };
  if (category) filter.category = category;
  if (featured === 'true') filter.isFeatured = true;

  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  const [total, courses] = await Promise.all([
    Course.countDocuments(filter),
    Course.find(filter).populate('category', 'name slug').sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);

  res.status(200).json({
    status: 'success',
    data: courses,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

// @desc    Get single published course with public lesson list
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id, isPublished: true }).populate(
    'category',
    'name slug'
  );

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Return lesson metadata only (no videoUrl for non-enrolled)
  const lessons = await Lesson.find({ courseId: course._id })
    .select('title order duration isFree')
    .sort({ order: 1 });

  res.status(200).json({ status: 'success', data: { ...course.toJSON(), lessons } });
});

// ─── ADMIN ───────────────────────────────────────────────────────────────────

// @desc    Get all courses (including unpublished)
// @route   GET /api/admin/courses
// @access  Admin
const adminGetAllCourses = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  const [total, courses] = await Promise.all([
    Course.countDocuments(),
    Course.find().populate('category', 'name slug').sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);

  res.status(200).json({
    status: 'success',
    data: courses,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

// @desc    Create a course
// @route   POST /api/admin/courses
// @access  Admin
const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);

  await createAuditLog({
    adminId: req.user._id,
    action: 'CREATE_COURSE',
    module: 'courses',
    targetId: course._id,
    details: { title: course.title },
    ip: req.ip,
  });

  res.status(201).json({ status: 'success', data: course });
});

// @desc    Update a course
// @route   PUT /api/admin/courses/:id
// @access  Admin
const updateCourse = asyncHandler(async (req, res) => {
  const before = await Course.findById(req.params.id);
  if (!before) {
    res.status(404);
    throw new Error('Course not found');
  }

  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  await createAuditLog({
    adminId: req.user._id,
    action: 'UPDATE_COURSE',
    module: 'courses',
    targetId: course._id,
    details: { before: before.toObject(), after: course.toObject() },
    ip: req.ip,
  });

  res.status(200).json({ status: 'success', data: course });
});

// @desc    Archive (unpublish) a course — never hard delete
// @route   DELETE /api/admin/courses/:id
// @access  Admin
const archiveCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { isPublished: false },
    { new: true }
  );

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  await createAuditLog({
    adminId: req.user._id,
    action: 'ARCHIVE_COURSE',
    module: 'courses',
    targetId: course._id,
    details: { title: course.title },
    ip: req.ip,
  });

  res.status(200).json({ status: 'success', message: 'Course archived', data: course });
});

export {
  getPublishedCourses,
  getCourseById,
  adminGetAllCourses,
  createCourse,
  updateCourse,
  archiveCourse,
};
