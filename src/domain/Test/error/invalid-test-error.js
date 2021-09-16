const ApplicationError = require('../../application-error');

class InvalidTestError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidTestError';
  }
}

module.exports = InvalidTestError;
