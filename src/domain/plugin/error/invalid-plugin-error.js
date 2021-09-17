const ApplicationError = require('../../application-error');

class InvalidPluginError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidPluginError';
  }
}

module.exports = InvalidPluginError;
