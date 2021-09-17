const SavePluginResponse = require('./get-plugin-response');
const Plugin = require('../../domain/plugin/plugin');

class GetPlugin {
  constructor({ idGenerator, pluginRepository }) {
    this.idGenerator = idGenerator;
    this.pluginRepository = pluginRepository;
  }

  async get({ id }) {
    const domain = await this.pluginRepository.find(id)
    const formatDomain = domain.toObject()
    return new SavePluginResponse({
      id: formatDomain.id,
      name: formatDomain.name,
      source: formatDomain.source
    });
  }
}

module.exports = GetPlugin;
