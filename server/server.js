require('dotenv').config();
const { connectDB } = require('./config/db');
const app = require('./app');

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
