const axios = require('axios');

class ChartService {
  async getPepeChartData(timeframe = '24h') {
    try {
      // Mock - replace with CoinGecko/Birdeye API
      const mockData = this._generateMockData(timeframe);
      return mockData;
    } catch (error) {
      throw new Error(`Chart data fetch failed: ${error.message}`);
    }
  }

  _generateMockData(timeframe) {
    // ... (same mock generator as in chartController)
  }
}

module.exports = new ChartService();
