const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

// GET /balance/:userId
router.get('/:userId', balanceController.getBalance);

module.exports = router;
