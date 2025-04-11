const { ValidationError, SecurityError } = require('../utils/errors');

module.exports = {
  errorHandler: (err, req, res, next) => {
    // Log via our Logger
    require('./logger').Logger.log(err);

    // Telegram WebApp-friendly error format
    const response = {
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    };

    // Determine status code
    let statusCode = 500;
    if (err instanceof ValidationError) statusCode = 400;
    if (err instanceof SecurityError) statusCode = 403;

    res.status(statusCode).json(response);
  }
};
