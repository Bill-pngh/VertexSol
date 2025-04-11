const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

// GET /charts/pepe?timeframe=24h
router.get('/pepe', chartController.getPepeChartData);

module.exports = router;
