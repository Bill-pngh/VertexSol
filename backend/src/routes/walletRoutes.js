const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// POST /wallet/connect
router.post('/connect', 
  // Validate input (middleware)
  (req, res, next) => {
    const { seedPhrase, userId } = req.body;
    if (!seedPhrase || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing seedPhrase or userId' 
      });
    }
    next();
  },
  walletController.connectWallet
);

// Security warning (static)
router.get('/warning', (req, res) => {
  res.status(200).json({
    warning: '⚠️ Never share your seed phrases with untrusted parties!',
  });
});

module.exports = router;
