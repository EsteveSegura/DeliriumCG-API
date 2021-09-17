const InvalidUserError = require('./error/invalid-user-error');

class User {
  constructor({ id, token, createdAt, updatedAt }) {
    this.id = id;
    this.token = token;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  set id(id) {
    if (!id) {
      throw new InvalidUserError('Field id cannot be empty');
    }

    this._id = id;
  }

  get id() {
    return this._id;
  }

  set token(token) {
    if (!token) {
      throw new InvalidUserError('Field token cannot be empty');
    }

    this._token = token;
  }

  get token() {
    return this._token;
  }

  set createdAt(createdAt) {
    if (!createdAt) {
      throw new InvalidUserError('Field createdAt cannot be empty');
    }

    this._createdAt = createdAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  set updatedAt(updatedAt) {
    if (!updatedAt) {
      throw new InvalidUserError('Field updatedAt cannot be empty');
    }

    this._updatedAt = updatedAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}

module.exports = User;

