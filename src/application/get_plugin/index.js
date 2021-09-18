const SavePluginResponse = require('./get-plugin-response');

class GetPlugin {
  constructor({ idGenerator, pluginRepository, userRepository }) {
    this.idGenerator = idGenerator;
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
  }

  async get({ id, candidateOwner }) {
    const domain = await this.pluginRepository.find(id)
    const userDomain = await this.userRepository.find(domain.ownerId);
    this._checkIfOwnerExists(userDomain)
    this._checkIfIsPrivateAndCheckOwner(domain, candidateOwner)

    const formatDomain = domain.toObject()
    return new SavePluginResponse({
      id: formatDomain.id,
      name: formatDomain.name,
      source: formatDomain.source,
      ownerId: formatDomain.ownerId,
      isPrivate: formatDomain.isPrivate
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
