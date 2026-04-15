import express from 'express';
import { getPublishedCourses, getCourseById } from '../controllers/courseController.js';
import { getCourseLessons, markLessonWatched } from '../controllers/lessonController.js';
import { getCourseReviews } from '../controllers/reviewController.js';
import { protect, optionalProtect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { paginationSchema } from '../validators/pagination.validator.js';
import { idParamSchema } from '../validators/objectId.validator.js';

const router = express.Router();

router.get('/', validate(paginationSchema, 'query'), getPublishedCourses);
router.get('/:id', validate(idParamSchema, 'params'), getCourseById);

// Lessons — optionally authenticated (enrolled = full content, anonymous = metadata)
router.get('/:id/lessons', validate(idParamSchema, 'params'), optionalProtect, getCourseLessons);
router.post('/:id/lessons/:lessonId/watched', protect, markLessonWatched);

// Reviews — public
router.get('/:id/reviews', validate(idParamSchema, 'params'), getCourseReviews);

export default router;
