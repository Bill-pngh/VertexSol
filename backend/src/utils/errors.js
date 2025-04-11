class SecurityError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SecurityError';
    this.statusCode = 403;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

module.exports = {
  SecurityError,
  ValidationError
};
