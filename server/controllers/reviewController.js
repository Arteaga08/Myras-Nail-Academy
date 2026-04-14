import asyncHandler from '../utils/asyncHandler.js';
import Review from '../models/Review.js';
import Enrollment from '../models/Enrollment.js';

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

// @desc    Delete a review
// @route   DELETE /api/admin/reviews/:id
// @access  Admin
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  res.status(200).json({ status: 'success', message: 'Review deleted' });
});

export { createReview, getCourseReviews, deleteReview };
