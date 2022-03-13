const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode);
  res.json({
    errors: err.messages,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
