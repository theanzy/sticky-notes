const { validationResult } = require('express-validator');
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode);
  res.json({
    errors: err.messages,
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
