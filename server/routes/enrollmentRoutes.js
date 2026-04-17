import express from 'express';
import { getMyEnrollments, checkCourseAccess } from '../controllers/enrollmentController.js';
import { getCertificate } from '../controllers/certificateController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/mine', protect, getMyEnrollments);
router.get('/check/:courseId', protect, checkCourseAccess);
router.get('/:enrollmentId/certificate', protect, getCertificate);

export default router;
