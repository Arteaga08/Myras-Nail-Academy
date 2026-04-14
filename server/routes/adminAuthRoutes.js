import express from 'express';
import { adminLogin } from '../controllers/authController.js';
import validate from '../middleware/validateMiddleware.js';
import { adminLoginSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/login', validate(adminLoginSchema), adminLogin);

export default router;
