import asyncHandler from '../utils/asyncHandler.js';
import Enrollment from '../models/Enrollment.js';

// @desc    Get all enrollments for the logged-in student
// @route   GET /api/enrollments/mine
// @access  Protected
const getMyEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({
    userId: req.user._id,
    accessGranted: true,
  })
    .populate('courseId', 'title slug thumbnail totalLessons averageRating')
    .sort({ enrolledAt: -1 });

  res.status(200).json({ status: 'success', data: enrollments });
});

// @desc    Check if student is enrolled in a specific course
// @route   GET /api/enrollments/check/:courseId
// @access  Protected
const checkCourseAccess = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findOne({
    userId: req.user._id,
    courseId: req.params.courseId,
    accessGranted: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      hasAccess: !!enrollment,
      enrollment: enrollment || null,
    },
  });
});

export { getMyEnrollments, checkCourseAccess };
