import express from 'express';
import { getMyEnrollments, checkCourseAccess } from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/mine', protect, getMyEnrollments);
router.get('/check/:courseId', protect, checkCourseAccess);

export default router;
