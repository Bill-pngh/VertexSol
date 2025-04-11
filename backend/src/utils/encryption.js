const crypto = require('crypto');

class Encryption {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.ivLength = 16;
    this.key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  }

  encrypt(text) {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final()
    ]);
    const tag = cipher.getAuthTag();
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
      tag: tag.toString('hex')
    };
  }

  decrypt(encryptedData, iv, tag) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(iv, 'hex')
    );
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedData, 'hex')),
      decipher.final()
    ]);
    return decrypted.toString('utf8');
  }
}

module.exports = new Encryption();
