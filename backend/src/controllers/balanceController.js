const { User } = require('../models');

/**
 * Gets user SOL balance (mock for now)
 * @param {number} userId - Telegram user ID
 */
exports.getBalance = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if wallet is connected
    const user = await User.findOne({ where: { userId } });
    let balance = 0;

    if (user && user.encryptedSeed) {
      // Mock balance (replace with real Solana RPC call later)
      balance = Math.random() * 0.5; // Random SOL between 0 and 0.5
    }

    res.status(200).json({
      success: true,
      balance: balance.toFixed(6),
      currency: 'SOL',
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch balance',
    });
  }
};
