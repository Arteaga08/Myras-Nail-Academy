const WHITELIST = process.env.CORS_WHITELIST
  ? process.env.CORS_WHITELIST.split(',')
  : ['http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
