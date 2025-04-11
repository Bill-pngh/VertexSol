const express = require('express');
const router = express.Router();

// Import route modules
const walletRoutes = require('./walletRoutes');
const tokenRoutes = require('./tokenRoutes');
const chartRoutes = require('./chartRoutes');
const balanceRoutes = require('./balanceRoutes');

// Combine routes
router.use('/wallet', walletRoutes);
router.use('/tokens', tokenRoutes);
router.use('/charts', chartRoutes);
router.use('/balance', balanceRoutes);

// Health check
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'VertexSol API is alive!' });
});

module.exports = router;
