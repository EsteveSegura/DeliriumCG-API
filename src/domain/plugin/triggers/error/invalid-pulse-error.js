const ApplicationError = require('../../../application-error');

class InvalidPulseError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidPulseError';
  }
}

module.exports = InvalidPulseError;
