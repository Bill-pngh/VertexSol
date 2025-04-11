const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

// POST /tokens/snipe
router.post('/snipe', 
  (req, res, next) => {
    if (!req.body.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'UserId required' 
      });
    }
    next();
  },
  tokenController.snipeTokens
);

// GET /tokens/portfolio/:userId
router.get('/portfolio/:userId', tokenController.getPortfolio);

module.exports = router;
