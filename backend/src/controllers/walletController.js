const crypto = require('crypto');
const { User } = require('../models'); // We'll define the model later
const { Solana } = require('@solana/web3.js'); // For wallet validation

// Encryption key (32 bytes for AES-256) - Store in Render.com env variables!
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; 
const IV_LENGTH = 16; // AES IV length

/**
 * Encrypts a seed phrase using AES-256-GCM
 * @param {string} text - Seed phrase
 * @returns {Object} { iv, encryptedData }
 */
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  };
};

/**
 * Connects a wallet by storing the encrypted seed phrase
 * @param {string} seedPhrase - 12/24-word mnemonic
 * @param {number} userId - Telegram user ID
 * @returns {Object} { success, message, walletAddress? }
 */
exports.connectWallet = async (req, res) => {
  const { seedPhrase, userId } = req.body;

  // Validate seed phrase format (BIP-39)
  const words = seedPhrase.trim().split(/\s+/g);
  if (words.length !== 12 && words.length !== 24) {
    return res.status(400).json({
      success: false,
      message: 'Invalid seed phrase. Must be 12 or 24 words.',
    });
  }

  try {
    // Encrypt the seed phrase
    const { iv, encryptedData } = encrypt(seedPhrase);

    // Store in PostgreSQL (we'll define the User model later)
    await User.upsert({
      userId,
      encryptedSeed: encryptedData,
      encryptionIv: iv,
    });

    // Generate wallet address (mock for now - replace with real Solana derivation)
    const walletAddress = `SOL${crypto.randomBytes(20).toString('hex').slice(0, 32)}`;

    res.status(200).json({
      success: true,
      message: 'Wallet connected securely!',
      walletAddress,
    });
  } catch (error) {
    console.error('Wallet connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to connect wallet. Please try again.',
    });
  }
};
