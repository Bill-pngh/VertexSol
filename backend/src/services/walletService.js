const crypto = require('crypto');
const { User } = require('../models');
const { Keypair } = require('@solana/web3.js');

class WalletService {
  constructor() {
    this.encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  }

  /**
   * Encrypts a seed phrase using AES-256-GCM
   * @param {string} seedPhrase 
   * @returns {iv: string, encryptedSeed: string}
   */
  encryptSeedPhrase(seedPhrase) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', this.encryptionKey, iv);
    const encrypted = Buffer.concat([
      cipher.update(seedPhrase, 'utf8'),
      cipher.final()
    ]);
    return {
      iv: iv.toString('hex'),
      encryptedSeed: encrypted.toString('hex')
    };
  }

  /**
   * Generates a Solana wallet address from seed phrase
   * @param {string} seedPhrase 
   * @returns {string} Public key (base58)
   */
  generateSolanaWallet(seedPhrase) {
    const keypair = Keypair.fromSeed(
      crypto.createHash('sha256').update(seedPhrase).digest().slice(0, 32)
    );
    return keypair.publicKey.toBase58();
  }

  /**
   * Connects a wallet and stores encrypted seed
   * @param {string} seedPhrase 
   * @param {number} userId 
   * @returns {walletAddress: string}
   */
  async connectWallet(seedPhrase, userId) {
    const { iv, encryptedSeed } = this.encryptSeedPhrase(seedPhrase);
    const walletAddress = this.generateSolanaWallet(seedPhrase);

    await User.upsert({
      userId,
      encryptedSeed,
      encryptionIv: iv,
      walletAddress
    });

    return { walletAddress };
  }
}

module.exports = new WalletService();
