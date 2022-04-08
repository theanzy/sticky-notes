const { validationResult } = require('express-validator');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  if (err.message && err.message.includes('No authorization token')) {
    res.status(401);
  } else {
    res.status(statusCode);
  }
  res.json({
    errors: err.error ? [...err.error] : [err.message],
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const validateModelError = (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  if (hasError) {
    res.status(422).json({ errors: error.array() });
  } else {
    next();
  }
};

module.exports = {
  errorHandler,
  validateModelError,
};
