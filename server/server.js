import 'dotenv/config';
import { connectDB } from './config/db.js';
import app from './app.js';

// Validate required environment variables before starting
const REQUIRED_ENV = [
  'MONGO_URI',
  'JWT_SECRET',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'ADMIN_EMAIL',
  'FRONTEND_URL',
  'NODE_ENV',
];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}

// Reject weak or placeholder JWT_SECRET values
if (
  process.env.JWT_SECRET.length < 32 ||
  process.env.JWT_SECRET.includes('change_this')
) {
  console.error('❌ JWT_SECRET is weak or placeholder. Generate one with: openssl rand -base64 64');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV}]`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

startServer();
