const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');

// Sanitize against NoSQL injection (removes $ and . from keys)
const sanitizeNoSQL = mongoSanitize({
  replaceWith: '_',
});

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

module.exports = { sanitizeNoSQL, sanitizeXSS };
