require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { walletRateLimiter } = require('./utils/rateLimiter');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

// Initialize Express
const app = express();

// ======================
// 1. Security Middleware
// ======================
app.use(helmet()); // HTTP headers security
app.use(cors({
  origin: [
    'https://telegram.org', // Telegram WebApp origin
    process.env.FRONTEND_URL // Your frontend URL
  ],
  credentials: true
}));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per window
});
app.use('/api/', apiLimiter);

// ======================
// 2. Request Processing
// ======================
app.use(express.json({ limit: '10kb' })); // Body parser
app.use(express.urlencoded({ extended: true }));

// Telegram WebApp data validation middleware
app.use((req, res, next) => {
  if (req.headers['telegram-webapp-initdata']) {
    const isValid = require('./utils/validation').isTelegramWebApp(
      req.headers['telegram-webapp-initdata']
    );
    if (!isValid) return res.status(403).json({ error: 'Invalid Telegram request' });
  }
  next();
});

// ======================
// 3. Route Integration
// ======================
app.use('/api', routes);

// Apply wallet-specific rate limiting
app.use('/api/wallet/connect', walletRateLimiter);

// ======================
// 4. Error Handling
// ======================
app.use(errorHandler); // Custom error handler (we'll create this next)

// ======================
// 5. Server Initialization
// ======================
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`VertexSol API running on port ${PORT}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

module.exports = app;
