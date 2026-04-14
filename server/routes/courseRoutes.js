import express from 'express';
import { getPublishedCourses, getCourseById } from '../controllers/courseController.js';
import { getCourseLessons, markLessonWatched } from '../controllers/lessonController.js';
import { getCourseReviews } from '../controllers/reviewController.js';
import { protect, optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPublishedCourses);
router.get('/:id', getCourseById);

// Lessons — optionally authenticated (enrolled = full content, anonymous = metadata)
router.get('/:id/lessons', optionalProtect, getCourseLessons);
router.post('/:id/lessons/:lessonId/watched', protect, markLessonWatched);

// Reviews — public
router.get('/:id/reviews', getCourseReviews);

export default router;
