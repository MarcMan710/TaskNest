// This middleware catches errors and sends consistent error responses.
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: message,
    },
  });

};

module.exports = errorMiddleware;
