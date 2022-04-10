const { validationResult } = require('express-validator');

const strIncludes = (str, listOfWords) => {
  return new RegExp(listOfWords.join('|')).test(str);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const jwtErrors = ['No authorization token', 'jwt'];
  if (err.message && strIncludes(err.message, jwtErrors)) {
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
    const data = error.errors.map((e) => e.msg);
    res.status(422).json({ errors: data });
  } else {
    next();
  }
};

module.exports = {
  errorHandler,
  validateModelError,
};
