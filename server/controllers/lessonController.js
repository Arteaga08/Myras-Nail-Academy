import asyncHandler from '../utils/asyncHandler.js';
import Lesson from '../models/Lesson.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import { createAuditLog } from '../services/auditService.js';

// ─── STUDENT ─────────────────────────────────────────────────────────────────

// @desc    Get lessons for a course (full access if enrolled, metadata only if not)
// @route   GET /api/courses/:id/lessons
// @access  Public (metadata) / Protected (full content if enrolled)
const getCourseLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({ courseId: req.params.id }).sort({ order: 1 });

  if (!lessons.length) {
    return res.status(200).json({ status: 'success', data: [] });
  }

  // Check if authenticated user is enrolled
  let isEnrolled = false;
  if (req.user) {
    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: req.params.id,
      accessGranted: true,
    });
    isEnrolled = !!enrollment;
  }

  // Enrolled students see full lesson data; others see metadata only
  const data = lessons.map((lesson) => {
    if (isEnrolled || lesson.isFree) {
      return lesson.toObject();
    }
    const { title, order, duration, isFree, _id } = lesson;
    return { _id, title, order, duration, isFree };
  });

  res.status(200).json({ status: 'success', data });
});

// @desc    Mark a lesson as watched
// @route   POST /api/courses/:id/lessons/:lessonId/watched
// @access  Protected (enrolled students only)
const markLessonWatched = asyncHandler(async (req, res) => {
  const { id: courseId, lessonId } = req.params;

  const enrollment = await Enrollment.findOne({
    userId: req.user._id,
    courseId,
    accessGranted: true,
  });

  if (!enrollment) {
    res.status(403);
    throw new Error('You are not enrolled in this course');
  }

  // Add lesson to completedLessons if not already there
  if (!enrollment.completedLessons.includes(lessonId)) {
    enrollment.completedLessons.push(lessonId);
  }

  // Recalculate progress
  const totalLessons = await Lesson.countDocuments({ courseId });
  enrollment.progressPercent =
    totalLessons > 0 ? Math.round((enrollment.completedLessons.length / totalLessons) * 100) : 0;

  // Mark as completed if all lessons watched
  if (enrollment.progressPercent === 100 && !enrollment.completedAt) {
    enrollment.completedAt = new Date();
  }

  await enrollment.save();

  res.status(200).json({
    status: 'success',
    data: {
      completedLessons: enrollment.completedLessons,
      progressPercent: enrollment.progressPercent,
      completedAt: enrollment.completedAt,
    },
  });
});

// ─── ADMIN ───────────────────────────────────────────────────────────────────

// @desc    Create a lesson for a course
// @route   POST /api/admin/courses/:id/lessons
// @access  Admin
const createLesson = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  const lesson = await Lesson.create({ ...req.body, courseId: req.params.id });

  // Update totalLessons and totalDuration on course
  await Course.findByIdAndUpdate(req.params.id, {
    $inc: {
      totalLessons: 1,
      totalDuration: lesson.duration || 0,
    },
  });

  await createAuditLog({
    adminId: req.user._id,
    action: 'CREATE_LESSON',
    module: 'lessons',
    targetId: lesson._id,
    details: { title: lesson.title, courseId: req.params.id },
    ip: req.ip,
  });

  res.status(201).json({ status: 'success', data: lesson });
});

// @desc    Update a lesson
// @route   PUT /api/admin/lessons/:id
// @access  Admin
const updateLesson = asyncHandler(async (req, res) => {
  const before = await Lesson.findById(req.params.id);
  if (!before) {
    res.status(404);
    throw new Error('Lesson not found');
  }

  const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Recalculate course totalDuration if duration changed
  if (req.body.duration !== undefined) {
    const durationDiff = (req.body.duration || 0) - (before.duration || 0);
    await Course.findByIdAndUpdate(before.courseId, {
      $inc: { totalDuration: durationDiff },
    });
  }

  await createAuditLog({
    adminId: req.user._id,
    action: 'UPDATE_LESSON',
    module: 'lessons',
    targetId: lesson._id,
    details: { before: before.toObject(), after: lesson.toObject() },
    ip: req.ip,
  });

  res.status(200).json({ status: 'success', data: lesson });
});

// @desc    Delete a lesson
// @route   DELETE /api/admin/lessons/:id
// @access  Admin
const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);
  if (!lesson) {
    res.status(404);
    throw new Error('Lesson not found');
  }

  // Update course counters
  await Course.findByIdAndUpdate(lesson.courseId, {
    $inc: {
      totalLessons: -1,
      totalDuration: -(lesson.duration || 0),
    },
  });

  await createAuditLog({
    adminId: req.user._id,
    action: 'DELETE_LESSON',
    module: 'lessons',
    targetId: lesson._id,
    details: { title: lesson.title, courseId: lesson.courseId },
    ip: req.ip,
  });

  res.status(200).json({ status: 'success', message: 'Lesson deleted' });
});

export {
  getCourseLessons,
  markLessonWatched,
  createLesson,
  updateLesson,
  deleteLesson,
};
