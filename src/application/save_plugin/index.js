const SavePluginResponse = require('./save-plugin-response');
const Plugin = require('../../domain/plugin/plugin');

class SavePlugin {
  constructor({ idGenerator, pluginRepository }) {
    this.idGenerator = idGenerator;
    this.pluginRepository = pluginRepository;
  }

  async save({ name, source }) {
    const id = this.idGenerator.generate();
    const currentDate = new Date();
    const pluginDomain = new Plugin({ id, name, source, createdAt: currentDate, updatedAt: currentDate });

    this.pluginRepository.save(pluginDomain)

    return new SavePluginResponse({ id: pluginDomain.id });
  }
}

module.exports = SavePlugin;
