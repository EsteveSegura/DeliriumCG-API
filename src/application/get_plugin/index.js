const GetPluginResponse = require('./get-plugin-response');

class GetPlugin {
  constructor({ idGenerator, pluginRepository, userRepository, triggerBuilder }) {
    this.idGenerator = idGenerator;
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
    this.triggerBuilder = triggerBuilder;
  }

  async get({ id, candidateOwner }) {
    //TODO: Check if plugin exists
    const domain = await this.pluginRepository.find(id)

    const userDomain = await this.userRepository.find(domain.ownerId);
    this._checkIfOwnerExists(userDomain)
    this._checkIfIsPrivateAndCheckOwner(domain, candidateOwner)

    const formatDomain = domain.toObject()
    //console.log(this.triggerBuilder.make(formatDomain.triggers))
    return new GetPluginResponse({
      id: formatDomain.id,
      name: formatDomain.name,
      source: formatDomain.source,
      ownerId: formatDomain.ownerId,
      isPrivate: formatDomain.isPrivate,
      triggers: this.triggerBuilder.make(formatDomain.triggers)
    });
  }

  _checkIfOwnerExists(user) {
    if(!user){
      throw new Error("Owner not exists")
    }
  }

  _checkIfIsPrivateAndCheckOwner(plugin, candidateOwner) {
    if (plugin.isPrivate && !plugin.checkOwner(candidateOwner)) {
      throw new Error("Not the owner")
    }
  }
}

module.exports = GetPlugin;
