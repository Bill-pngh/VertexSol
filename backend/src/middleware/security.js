const helmet = require('helmet');

// Enhanced CSP for Telegram WebApp
const contentSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'", "https://telegram.org"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://telegram.org"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https://*.telegram.org"],
    connectSrc: ["'self'", process.env.SOLANA_RPC_URL]
  }
};

// Security middleware stack
const securityMiddleware = [
  helmet({
    contentSecurityPolicy,
    crossOriginEmbedderPolicy: false // Required for Telegram iframe
  }),
  (req, res, next) => {
    // Block non-Telegram origins for sensitive routes
    if (req.path.startsWith('/api/wallet') && 
        !req.headers['telegram-webapp-initdata']) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  }
];

module.exports = securityMiddleware;
