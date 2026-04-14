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

import { deleteReview } from '../controllers/reviewController.js';
import { getUsers, getUserById, getAdminOrders, getDashboardStats, getAuditLogs } from '../controllers/adminController.js';

import { createCourseSchema, updateCourseSchema } from '../validators/course.validator.js';
import { createLessonSchema, updateLessonSchema } from '../validators/lesson.validator.js';
import { createCategorySchema, updateCategorySchema } from '../validators/category.validator.js';

const router = express.Router();

// All routes below require admin authentication
router.use(protect, adminOnly);

// ─── Dashboard ────────────────────────────────────────────────────────────────
router.get('/stats', getDashboardStats);
router.get('/audit', getAuditLogs);

// ─── Users ────────────────────────────────────────────────────────────────────
router.get('/users', getUsers);
router.get('/users/:id', getUserById);

// ─── Courses ──────────────────────────────────────────────────────────────────
router.get('/courses', adminGetAllCourses);
router.post('/courses', validate(createCourseSchema), createCourse);
router.put('/courses/:id', validate(updateCourseSchema), updateCourse);
router.delete('/courses/:id', archiveCourse);

// ─── Lessons ──────────────────────────────────────────────────────────────────
router.post('/courses/:id/lessons', validate(createLessonSchema), createLesson);
router.put('/lessons/:id', validate(updateLessonSchema), updateLesson);
router.delete('/lessons/:id', deleteLesson);

// ─── Categories ───────────────────────────────────────────────────────────────
router.post('/categories', validate(createCategorySchema), createCategory);
router.put('/categories/:id', validate(updateCategorySchema), updateCategory);
router.delete('/categories/:id', deleteCategory);

// ─── Orders ───────────────────────────────────────────────────────────────────
router.get('/orders', getAdminOrders);

// ─── Reviews ──────────────────────────────────────────────────────────────────
router.delete('/reviews/:id', deleteReview);

export default router;
