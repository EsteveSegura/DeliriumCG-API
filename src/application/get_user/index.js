const GetUserReponse = require('./get-user-response');

class GetUser {
  constructor({pluginRepository, userRepository}) {
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
  }

  async get({id}) {
    const userDomain = await this.userRepository.find(id);
    this._checkIfOwnerExists(userDomain);

    const pluginsOwner = await this.pluginRepository.findByOwnerId(id);
    const readablePlugins = pluginsOwner.map((plugin) => plugin.toObject());

    return new GetUserReponse({
      id: id,
      token: userDomain.token,
      twitchUsername: userDomain.twitchUsername,
      plugins: readablePlugins,
    });
  }

  _checkIfOwnerExists(user) {
    if (!user) {
      throw new Error('Owner not exists');
    }
  }
}

module.exports = GetUser;
