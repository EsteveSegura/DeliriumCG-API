const ListPluginsResponse = require('./list-plugins-response');

class ListPlugins {
  constructor({pluginRepository, userRepository, triggerBuilder, redisPubSubMessage}) {
    this.pluginRepository = pluginRepository;
    this.userRepository = userRepository;
    this.triggerBuilder = triggerBuilder;
    this.redisPubSubMessage = redisPubSubMessage;
  }

  async list({showPrivatePlugins}) {
    const domain = await this.pluginRepository.findAllByPrivate(showPrivatePlugins);
    const plugins = domain.map((plugin) => plugin.toObject());
    return new ListPluginsResponse({plugins});
  }
}

module.exports = ListPlugins;
