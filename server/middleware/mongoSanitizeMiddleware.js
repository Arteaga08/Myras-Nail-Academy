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

// Sanitize against NoSQL injection — only touches req.body (Express 5 compatible)
const sanitizeNoSQL = (req, res, next) => {
  if (req.body) sanitizeObject(req.body);
  next();
};

// Sanitize against XSS (clean body string values)
const sanitizeXSS = (req, res, next) => {
  if (req.body) {
    const sanitizeValue = (value) => {
      if (typeof value === 'string') return xss(value);
      if (typeof value === 'object' && value !== null) {
        return Object.fromEntries(
          Object.entries(value).map(([k, v]) => [k, sanitizeValue(v)])
        );
      }
      return value;
    };
    req.body = sanitizeValue(req.body);
  }
  next();
};

export { sanitizeNoSQL, sanitizeXSS };
