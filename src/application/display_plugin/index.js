const GetPluginResponse = require('./display-plugin-response');

class DisplayPlugin {
  constructor({ pluginRepository, userRepository, triggerBuilder }) {
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
    this.triggerBuilder = triggerBuilder;
  }

  async display({ id }) {
    const domain = await this.pluginRepository.find(id)

    const userDomain = await this.userRepository.find(domain.ownerId);
    this._checkIfOwnerExists(userDomain)

    const formatDomain = domain.toObject()
    return new GetPluginResponse({ source: formatDomain.source });
  }

  _checkIfOwnerExists(user) {
    if(!user){
      throw new Error("Owner not exists")
    }
  }
}

module.exports = DisplayPlugin;
