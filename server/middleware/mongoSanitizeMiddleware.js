import xss from 'xss';

// Recursively removes keys containing $ or . (NoSQL injection prevention)
const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  for (const key of Object.keys(obj)) {
    if (key.includes('$') || key.includes('.')) {
      delete obj[key];
    } else {
      obj[key] = sanitizeObject(obj[key]);
    }
  }
  return obj;
};

// Recursively XSS-clean string values in-place (Express 5 req.query/req.params are getter-only)
const sanitizeStringsInPlace = (obj) => {
  if (typeof obj !== 'object' || obj === null) return;
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === 'string') {
      obj[key] = xss(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitizeStringsInPlace(value);
    }
  }
};

// Sanitize against NoSQL injection on body, query and params
const sanitizeNoSQL = (req, res, next) => {
  if (req.body && !Buffer.isBuffer(req.body)) sanitizeObject(req.body);
  if (req.query) sanitizeObject(req.query);
  if (req.params) sanitizeObject(req.params);
  next();
};

// Sanitize against XSS on body, query and params (mutate in-place for Express 5)
const sanitizeXSS = (req, res, next) => {
  if (req.body && !Buffer.isBuffer(req.body)) sanitizeStringsInPlace(req.body);
  if (req.query) sanitizeStringsInPlace(req.query);
  if (req.params) sanitizeStringsInPlace(req.params);
  next();
};

export { sanitizeNoSQL, sanitizeXSS };
