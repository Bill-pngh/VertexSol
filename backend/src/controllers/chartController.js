/**
 * Generates mock $PEPE price data (replace with real API later)
 * @returns {Array} Candlestick data for 24h
 */
const generateMockPepeData = () => {
  const data = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);

    // Random price movement around $0.000001
    const open = 0.000001 * (1 + (Math.random() - 0.5) * 0.2);
    const close = open * (1 + (Math.random() - 0.5) * 0.1);
    const high = Math.max(open, close) * (1 + Math.random() * 0.05);
    const low = Math.min(open, close) * (1 - Math.random() * 0.05);

    data.push({
      time: time.toISOString(),
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000000),
    });
  }
  return data;
};

/**
 * Fetches $PEPE chart data
 * @param {string} timeframe - 1h, 24h, 7d
 */
exports.getPepeChartData = async (req, res) => {
  const { timeframe = '24h' } = req.query;

  try {
    // Mock data (replace with CoinGecko/API call later)
    const data = generateMockPepeData();

    res.status(200).json({
      success: true,
      timeframe,
      currency: 'USD',
      data,
    });
  } catch (error) {
    console.error('Chart data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chart data',
    });
  }
};
