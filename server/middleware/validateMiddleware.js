// Generic Zod validator. `source` picks between body / query / params.
// For query/params we mutate the target in-place because Express 5 exposes
// req.query and req.params as getter-only properties.
const validate = (schema, source = 'body') => (req, res, next) => {
  const target = req[source];
  const result = schema.safeParse(target);
  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(', ');
    res.status(400);
    return next(new Error(message));
  }

  if (source === 'body') {
    req.body = result.data;
  } else {
    for (const key of Object.keys(target)) delete target[key];
    Object.assign(target, result.data);
  }

  next();
};

export default validate;
