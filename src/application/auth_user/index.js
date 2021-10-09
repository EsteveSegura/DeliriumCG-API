const AuthUserResponse = require('./auth-user-response');

class AuthUser {
  constructor({userRepository}) {
    this.userRepository = userRepository;
  }

  async auth({id}) {
    const domain = await this.userRepository.find(id);
    this._checkIfUserExists(domain);

    return new AuthUserResponse({id});
  }

  _checkIfUserExists(user) {
    if (!user) {
      throw new Error('Owner not exists');
    }
  }
}

module.exports = AuthUser;
