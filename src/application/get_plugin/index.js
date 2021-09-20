const GetPluginResponse = require('./get-plugin-response');

class GetPlugin {
  constructor({ pluginRepository, userRepository, triggerBuilder, redisPubSubMessage }) {
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
    this.triggerBuilder = triggerBuilder;
    this.redisPubSubMessage = redisPubSubMessage;
  }

  async get({ id, candidateOwner }) {
    //TODO: Check if plugin exists
    const domain = await this.pluginRepository.find(id)

    const userDomain = await this.userRepository.find(domain.ownerId);
    console.log(userDomain)
    this._checkIfOwnerExists(userDomain)
    this._checkIfIsPrivateAndCheckOwner(domain, candidateOwner)
    // this.redisPubSubMessage.publish({channel: 'test2', message: 'She'})

    const formatDomain = domain.toObject()
    
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
