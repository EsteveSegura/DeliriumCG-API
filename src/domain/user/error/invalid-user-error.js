const ApplicationError = require('../../application-error');

class InvalidUserError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidUserError';
  }
}

module.exports = InvalidUserError;
