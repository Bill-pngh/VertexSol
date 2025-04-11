const { User } = require('../models');

class Validation {
  async isExistingUser(userId) {
    return !!(await User.findOne({ where: { userId } }));
  }

  isValidSeedPhrase(phrase) {
    const words = phrase.trim().split(/\s+/g);
    return [12, 24].includes(words.length) && 
           words.every(w => /^[a-z]+$/.test(w));
  }

  isTelegramWebApp(initData) {
    try {
      const params = new URLSearchParams(initData);
      return params.has('user') && params.has('hash');
    } catch {
      return false;
    }
  }
}

module.exports = new Validation();
