const { User } = require('../models');

/**
 * Mock "Snipe New Tokens" functionality
 * @param {number} userId - Telegram user ID
 * @returns {Object} Mock transaction data
 */
exports.snipeTokens = async (req, res) => {
  const { userId } = req.body;

  // Check if wallet is connected
  const user = await User.findOne({ where: { userId } });
  if (!user || !user.encryptedSeed) {
    return res.status(403).json({
      success: false,
      message: 'Connect your wallet first!',
    });
  }

  // Mock token snipe (replace with real Solana transaction later)
  const mockTokens = ['PEPE', 'DOGS', 'BONK'];
  const randomToken = mockTokens[Math.floor(Math.random() * mockTokens.length)];

  res.status(200).json({
    success: true,
    message: `Snipped 1000 ${randomToken}!`,
    token: randomToken,
  });
};

/**
 * Gets user portfolio (mock data for now)
 */
exports.getPortfolio = async (req, res) => {
  const { userId } = req.params;

  // Mock portfolio data
  res.status(200).json({
    portfolio: [
      { token: 'SOL', amount: 0.5 },
      { token: 'PEPE', amount: 1000 },
    ],
  });
};
