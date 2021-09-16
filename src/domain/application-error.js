// eslint-disable-next-line require-jsdoc
class ApplicationError extends Error {
  // eslint-disable-next-line require-jsdoc
  constructor(message) {
    super(message);
    this.name = 'ApplicationError';
  }
}

module.exports = ApplicationError;
