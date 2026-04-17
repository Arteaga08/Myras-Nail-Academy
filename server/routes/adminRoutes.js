import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';

import {
  adminGetAllCourses,
  createCourse,
  updateCourse,
  archiveCourse,
} from '../controllers/courseController.js';

import { createLesson, updateLesson, deleteLesson } from '../controllers/lessonController.js';

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

import { deleteReview, getAdminReviews } from '../controllers/reviewController.js';
import { getUsers, getUserById, getAdminOrders, getDashboardStats, getAuditLogs } from '../controllers/adminController.js';
import { reconcileOrder } from '../controllers/adminOrderController.js';

import { createCourseSchema, updateCourseSchema } from '../validators/course.validator.js';
import { createLessonSchema, updateLessonSchema } from '../validators/lesson.validator.js';
import { createCategorySchema, updateCategorySchema } from '../validators/category.validator.js';
import { paginationSchema } from '../validators/pagination.validator.js';
import { idParamSchema, paymentIdParamSchema } from '../validators/objectId.validator.js';

const router = express.Router();

// All routes below require admin authentication
router.use(protect, adminOnly);

// ─── Dashboard ────────────────────────────────────────────────────────────────
router.get('/stats', getDashboardStats);
router.get('/audit', validate(paginationSchema, 'query'), getAuditLogs);

// ─── Users ────────────────────────────────────────────────────────────────────
router.get('/users', validate(paginationSchema, 'query'), getUsers);
router.get('/users/:id', validate(idParamSchema, 'params'), getUserById);

// ─── Courses ──────────────────────────────────────────────────────────────────
router.get('/courses', validate(paginationSchema, 'query'), adminGetAllCourses);
router.post('/courses', validate(createCourseSchema), createCourse);
router.put('/courses/:id', validate(idParamSchema, 'params'), validate(updateCourseSchema), updateCourse);
router.delete('/courses/:id', validate(idParamSchema, 'params'), archiveCourse);

// ─── Lessons ──────────────────────────────────────────────────────────────────
router.post('/courses/:id/lessons', validate(idParamSchema, 'params'), validate(createLessonSchema), createLesson);
router.put('/lessons/:id', validate(idParamSchema, 'params'), validate(updateLessonSchema), updateLesson);
router.delete('/lessons/:id', validate(idParamSchema, 'params'), deleteLesson);

// ─── Categories ───────────────────────────────────────────────────────────────
router.post('/categories', validate(createCategorySchema), createCategory);
router.put('/categories/:id', validate(idParamSchema, 'params'), validate(updateCategorySchema), updateCategory);
router.delete('/categories/:id', validate(idParamSchema, 'params'), deleteCategory);

// ─── Orders ───────────────────────────────────────────────────────────────────
router.get('/orders', validate(paginationSchema, 'query'), getAdminOrders);
router.post('/orders/:paymentId/reconcile', validate(paymentIdParamSchema, 'params'), reconcileOrder);

// ─── Reviews ──────────────────────────────────────────────────────────────────
router.get('/reviews', validate(paginationSchema, 'query'), getAdminReviews);
router.delete('/reviews/:id', validate(idParamSchema, 'params'), deleteReview);

export default router;
