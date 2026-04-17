import asyncHandler from '../utils/asyncHandler.js';
import Review from '../models/Review.js';
import Enrollment from '../models/Enrollment.js';
import { createAuditLog } from '../services/auditService.js';

// @desc    Create a review for a course (must be enrolled)
// @route   POST /api/reviews
// @access  Protected
const createReview = asyncHandler(async (req, res) => {
  const { courseId, rating, comment } = req.body;

  // Verify student is enrolled
  const enrollment = await Enrollment.findOne({
    userId: req.user._id,
    courseId,
    accessGranted: true,
  });

  if (!enrollment) {
    res.status(403);
    throw new Error('You must be enrolled in this course to leave a review');
  }

  const review = await Review.create({
    rating,
    comment,
    userId: req.user._id,
    courseId,
  });

  await review.populate('userId', 'firstName lastName');

  res.status(201).json({ status: 'success', data: review });
});

// @desc    Get all reviews for a course
// @route   GET /api/courses/:id/reviews
// @access  Public
const getCourseReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ courseId: req.params.id })
    .populate('userId', 'firstName lastName profilePicture')
    .sort({ createdAt: -1 });

  res.status(200).json({ status: 'success', data: reviews });
});

// @desc    Get all reviews (paginated)
// @route   GET /api/admin/reviews
// @access  Admin
const getAdminReviews = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  const [total, reviews] = await Promise.all([
    Review.countDocuments(),
    Review.find()
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
  ]);

  res.status(200).json({
    status: 'success',
    data: reviews,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

// @desc    Delete a review
// @route   DELETE /api/admin/reviews/:id
// @access  Admin
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  await createAuditLog({
    adminId: req.user._id,
    action: 'DELETE_REVIEW',
    module: 'Review',
    targetId: review._id,
    details: { courseId: review.courseId, rating: review.rating },
    ip: req.ip,
  });

  res.status(200).json({ status: 'success', message: 'Review deleted' });
});

export { createReview, getCourseReviews, deleteReview, getAdminReviews };
