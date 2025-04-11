const { Connection, PublicKey } = require('@solana/web3.js');

class BalanceService {
  constructor() {
    this.connection = new Connection(process.env.SOLANA_RPC_URL);
  }

  async getSolBalance(walletAddress) {
    try {
      const publicKey = new PublicKey(walletAddress);
      const balance = await this.connection.getBalance(publicKey);
      return balance / 10 ** 9; // Convert lamports to SOL
    } catch (error) {
      throw new Error(`Balance fetch failed: ${error.message}`);
    }
  }
}

module.exports = new BalanceService();
