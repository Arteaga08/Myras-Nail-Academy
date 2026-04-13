const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const corsOptions = require('./config/corsOptions');
const { sanitizeNoSQL, sanitizeXSS } = require('./middleware/mongoSanitizeMiddleware');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Trust proxy (for rate limiting, IP detection behind reverse proxy)
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

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
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin/auth', require('./routes/adminAuthRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/courses', require('./routes/courseRoutes'));
// app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));
// app.use('/api/reviews', require('./routes/reviewRoutes'));
// app.use('/api/webhooks', require('./routes/webhookRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
