const SavePluginResponse = require('./save-plugin-response');
const Plugin = require('../../domain/plugin/plugin');

const Pulse = require('../../domain/plugin/triggers/pulse');

class SavePlugin {
  constructor({ idGenerator, pluginRepository, userRepository, triggerBuilder }) {
    this.idGenerator = idGenerator;
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
    this.triggerBuilder = triggerBuilder;
  }

  async save({ name, source, ownerId, isPrivate = true, triggers }) {
    const findOwner = await this.userRepository.find(ownerId)
    this._checkIfOwnerExists(findOwner);

    const pluginTriggers = this.triggerBuilder.build(triggers);
    const id = this.idGenerator.generate();
    const currentDate = new Date();

    const pluginDomain = new Plugin({
      id,
      name,
      source,
      ownerId,
      isPrivate,
      triggers: pluginTriggers,
      createdAt: currentDate,
      updatedAt: currentDate
    });

    this.pluginRepository.save(pluginDomain)
    return new SavePluginResponse({ id: pluginDomain.id });
  }

  _checkIfOwnerExists(owner) {
    if (!owner) {
      throw new Error('Owner not exists.')
    }
  }
}

module.exports = SavePlugin;
