const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  let knownError = false;

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
    knownError = true;
  }

  // Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    knownError = true;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
    knownError = true;
  }

  const isProduction = process.env.NODE_ENV === 'production';

  // In production, hide raw messages for unknown 5xx errors
  if (isProduction && statusCode >= 500 && !knownError) {
    console.error(`[errorHandler] ${req.method} ${req.originalUrl} → ${err.stack || err.message}`);
    message = 'Internal server error';
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    stack: isProduction ? null : err.stack,
  });
};

export { notFound, errorHandler };
