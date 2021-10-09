const GetPluginResponse = require('./display-plugin-response');

class DisplayPlugin {
  constructor({pluginRepository, userRepository, coreInjectable}) {
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
    this.coreInjectable = coreInjectable;
  }

  async display({id}) {
    const domain = await this.pluginRepository.find(id);

    const userDomain = await this.userRepository.find(domain.ownerId);
    this._checkIfOwnerExists(userDomain);

    const core = this.coreInjectable.get({id, twitchUsername: userDomain.twitchUsername, source: domain.source});

    return new GetPluginResponse({source: core});
  }

  _checkIfOwnerExists(user) {
    if (!user) {
      throw new Error('Owner not exists');
    }
  }
}

module.exports = DisplayPlugin;
