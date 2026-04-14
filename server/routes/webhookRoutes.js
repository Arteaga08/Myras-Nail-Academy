import express from 'express';
import { handleStripeWebhook } from '../controllers/webhookController.js';

const router = express.Router();

// Raw body required for Stripe signature verification (set in app.js)
router.post('/stripe', handleStripeWebhook);

export default router;
