const InvalidUserError = require('./error/invalid-user-error');

class User {
  constructor({id, token, twitchUsername, createdAt, updatedAt}) {
    this.id = id;
    this.token = token;
    this.twitchUsername = twitchUsername;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  set twitchUsername(twitchUsername) {
    if (!twitchUsername) {
      throw new InvalidUserError('Field twitchUsername cannot be empty');
    }

    this._twitchUsername = twitchUsername;
  }

  get twitchUsername() {
    return this._twitchUsername;
  }

  toObject() {
    return {
      id: this.id,
      token: this.token,
      twitchUsername: this.twitchUsername,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
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

