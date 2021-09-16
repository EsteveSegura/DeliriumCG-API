const InvalidTestError = require('./error/invalid-test-error');

class Test {
  constructor({id, text, createdAt, updatedAt}) {
    this.id = id;
    this.text = text;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  set id(id) {
    if (!id) {
      throw new InvalidTestError('Field id cannot be empty');
    }

    this._id = id;
  }

  get id() {
    return this._id;
  }

  set text(text) {
    if (!text) {
      throw new InvalidTestError('Field text cannot be empty');
    }

    this._text = text;
  }

  get text() {
    return this._text;
  }

  set createdAt(createdAt) {
    if (!createdAt) {
      throw new InvalidTestError('Field createdAt cannot be empty');
    }

    this._createdAt = createdAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  set updatedAt(updatedAt) {
    if (!updatedAt) {
      throw new InvalidTestError('Field updatedAt cannot be empty');
    }

    this._updatedAt = updatedAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}

module.exports = Test;

