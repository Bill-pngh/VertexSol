const rateLimit = require('express-rate-limit');

const walletRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many wallet connection attempts. Try again later.'
  },
  skip: (req) => req.ip === '127.0.0.1' // Bypass for testing
});

module.exports = {
  walletRateLimiter
};
