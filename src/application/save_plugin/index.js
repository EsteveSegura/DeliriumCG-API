const SavePluginResponse = require('./save-plugin-response');
const Plugin = require('../../domain/plugin/plugin');

class SavePlugin {
  constructor({ idGenerator, pluginRepository, userRepository }) {
    this.idGenerator = idGenerator;
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
  }

  async save({ name, source, ownerId, isPrivate = true }) {
    const findOwner = await this.userRepository.find(ownerId)
    this._checkIfOwnerExists(findOwner)
    
    const id = this.idGenerator.generate();
    const currentDate = new Date();
    const pluginDomain = new Plugin({ id, name, source, ownerId, isPrivate, createdAt: currentDate, updatedAt: currentDate });

    this.pluginRepository.save(pluginDomain)

    return new SavePluginResponse({ id: pluginDomain.id });
  }

  _checkIfOwnerExists(owner){
    if(!owner){
      throw new Error('Owner not exists.')
    }
  }
}

module.exports = SavePlugin;
