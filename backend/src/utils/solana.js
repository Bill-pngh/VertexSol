const { Connection, Keypair, PublicKey } = require('@solana/web3.js');

class SolanaUtils {
  constructor() {
    this.connections = new Map();
    this.rpcUrls = [
      process.env.SOLANA_MAINNET_RPC,
      'https://api.mainnet-beta.solana.com'
    ];
  }

  getConnection() {
    const url = this.rpcUrls[0]; // Fallback handled in requests
    if (!this.connections.has(url)) {
      this.connections.set(url, new Connection(url, {
        commitment: 'confirmed',
        wsEndpoint: url.replace('https', 'wss')
      });
    }
    return this.connections.get(url);
  }

  async getBalance(walletAddress) {
    try {
      const connection = this.getConnection();
      return await connection.getBalance(new PublicKey(walletAddress));
    } catch (error) {
      console.error(`Balance fetch failed: ${error.message}`);
      throw error;
    }
  }

  validateAddress(address) {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = new SolanaUtils();
