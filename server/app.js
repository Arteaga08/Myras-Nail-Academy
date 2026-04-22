import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import corsOptions from './config/corsOptions.js';
import { sanitizeNoSQL, sanitizeXSS } from './middleware/mongoSanitizeMiddleware.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Trust proxy (for rate limiting, IP detection behind reverse proxy)
app.set('trust proxy', 1);

// Security headers — explicit CSP to allow Stripe + Cloudinary + DiceBear
const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", 'https://js.stripe.com'],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
  connectSrc: [
    "'self'",
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://api.stripe.com',
    'https://api.cloudinary.com',
  ],
  frameSrc: ['https://js.stripe.com', 'https://hooks.stripe.com'],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
  frameAncestors: ["'none'"],
};
if (process.env.NODE_ENV === 'production') {
  cspDirectives.upgradeInsecureRequests = [];
}
app.use(
  helmet({
    contentSecurityPolicy: { directives: cspDirectives },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Rate limiting — layered protection
const commonLimiterOpts = { standardHeaders: true, legacyHeaders: false };

// General limiter — protects entire API from abuse
const generalLimiter = rateLimit({
  ...commonLimiterOpts,
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: { success: false, message: 'Demasiadas peticiones. Intenta de nuevo en 1 minuto.' },
});

// Strict limiter for auth (brute force protection)
const authLimiter = rateLimit({
  ...commonLimiterOpts,
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Demasiados intentos de autenticación. Intenta de nuevo en 15 minutos.' },
});

// Payment creation limiter (prevents PaymentIntent spam)
const orderLimiter = rateLimit({
  ...commonLimiterOpts,
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Demasiados intentos de compra. Espera unos minutos.' },
});

// Review creation limiter
const reviewLimiter = rateLimit({
  ...commonLimiterOpts,
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Demasiadas reseñas. Intenta de nuevo más tarde.' },
});

// Stripe webhook limiter — prevents DoS against constructEvent signature checks
const webhookLimiter = rateLimit({
  ...commonLimiterOpts,
  windowMs: 60 * 1000,
  max: 30,
  skipFailedRequests: false,
  message: { success: false, message: 'Too many webhook requests.' },
});

// Apply limiters (specific routes first — Express matches in order)
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/admin/auth/login', authLimiter);
app.use('/api/webhooks/stripe', webhookLimiter);
app.use('/api/orders', orderLimiter);
app.use('/api/reviews', reviewLimiter);
app.use('/api', generalLimiter);

// CORS — whitelist only
app.use(cors(corsOptions));

// Raw body parser for Stripe webhooks (must come before express.json)
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security sanitization
app.use(sanitizeNoSQL);
app.use(sanitizeXSS);

// HTTP request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', env: process.env.NODE_ENV });
});

// Routes
app.use('/api/auth', (await import('./routes/authRoutes.js')).default);
app.use('/api/categories', (await import('./routes/categoryRoutes.js')).default);
app.use('/api/courses', (await import('./routes/courseRoutes.js')).default);
app.use('/api/enrollments', (await import('./routes/enrollmentRoutes.js')).default);
app.use('/api/orders', (await import('./routes/orderRoutes.js')).default);
app.use('/api/reviews', (await import('./routes/reviewRoutes.js')).default);
app.use('/api/webhooks', (await import('./routes/webhookRoutes.js')).default);
app.use('/api/admin/auth', (await import('./routes/adminAuthRoutes.js')).default);
app.use('/api/admin', (await import('./routes/adminRoutes.js')).default);

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;
