

class TriggerPulse {
  constructor({ pluginRepository, userRepository, triggerBuilder, redisPubSubMessage }) {
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
    this.triggerBuilder = triggerBuilder;
    this.redisPubSubMessage = redisPubSubMessage;
  }

  async trigger({ id, candidateOwner, name }) {
    //TODO: Check if plugin exists
    const domain = await this.pluginRepository.find(id)

    const userDomain = await this.userRepository.find(domain.ownerId);
    this._checkIfOwnerExists(userDomain)
    this._checkIfIsPrivateAndCheckOwner(domain, candidateOwner)
    const currentTrigger = this._findTrigger(name, domain)

    this.redisPubSubMessage.publish({ channel: id, message: JSON.stringify(currentTrigger.toObject())});
  }

  _findTrigger(triggerName, plugin) {
    if (!triggerName) {
      throw new Error("Trigger name not present")
    }

    const triggerInformation = plugin.triggers.find(trigger => trigger.name == triggerName);
    if (!triggerInformation) {
      throw new Error("Trigger not found")
    }

    return triggerInformation
  }

  _checkIfOwnerExists(user) {
    if (!user) {
      throw new Error("Owner not exists")
    }
  }

  _checkIfIsPrivateAndCheckOwner(plugin, candidateOwner) {
    if (plugin.isPrivate && !plugin.checkOwner(candidateOwner)) {
      throw new Error("Not the owner")
    }
  }
}

module.exports = TriggerPulse;
