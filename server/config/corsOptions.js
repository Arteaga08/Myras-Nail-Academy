const ALLOWED_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:5173';

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === ALLOWED_ORIGIN) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;
