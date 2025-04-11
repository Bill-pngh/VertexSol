const { ValidationError, SecurityError } = require('../utils/errors');
const { User } = require('../models');

/**
 * Validates Telegram WebApp initData
 */
const validateTelegramUser = async (req, res, next) => {
  try {
    const initData = req.headers['telegram-webapp-initdata'];
    if (!initData) throw new SecurityError('Telegram initData required');

    // Parse initData (simplified - use crypto for real verification)
    const params = new URLSearchParams(initData);
    const userData = JSON.parse(params.get('user'));
    
    if (!userData?.id) throw new ValidationError('Invalid Telegram user data');

    // Attach user to request
    req.telegramUser = {
      id: userData.id,
      username: userData.username
    };

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Checks if wallet is connected
 */
const checkWalletConnected = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { userId: req.telegramUser.id } });
    if (!user?.encryptedSeed) {
      throw new SecurityError('Wallet not connected');
    }
    req.walletAddress = user.walletAddress;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateTelegramUser,
  checkWalletConnected
};
