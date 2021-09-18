const awilix = require('awilix');

const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const JwtGenerator = require('./infrastructure/services/jwt-generator');
const idGenerator = require('./domain/services/id-generator');
const MUUID = require('uuid-mongodb');
const MongoUserRepository = require('./infrastructure/persistence/mongo/mongo-user-repository')
const MongoPluginRepository = require('./infrastructure/persistence/mongo/mongo-plugin-repository')
const saveUser = require('./application/save_user/index');
const savePlugin = require('./application/save_plugin/index');
const getPlugin = require('./application/get_plugin/index');
const displayPlugin = require('./application/display_plugin/index');
const mongoDbHandler = require('./infrastructure/persistence/mongo/db-handler');
const RedisDbHandler = require('./infrastructure/pubsub/redis-handler');
const userDocumentParser = require('./infrastructure/persistence/mongo/user-document-parser');
const pluginDocumentParser = require('./infrastructure/persistence/mongo/plugin-domain-parser');
const triggerDomainBuilder = require('./infrastructure/persistence/mongo/trigger-domain-builder');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  uuidv4: awilix.asValue(uuidv4),
  crypto: awilix.asValue(crypto),
  jwt: awilix.asValue(jsonwebtoken),
  TokenGenerator: awilix.asClass(JwtGenerator),
  idGenerator: awilix.asFunction(idGenerator),
  muuid: awilix.asValue(MUUID),
  userRepository: awilix.asClass(MongoUserRepository),
  pluginRepository: awilix.asClass(MongoPluginRepository),
  saveUser: awilix.asClass(saveUser),
  savePlugin: awilix.asClass(savePlugin),
  getPlugin: awilix.asClass(getPlugin),
  displayPlugin: awilix.asClass(displayPlugin),
  mongoDbHandler: awilix.asFunction(mongoDbHandler).singleton(),
  redisDbHandler: awilix.asClass(RedisDbHandler).singleton(),
  userDocumentParser: awilix.asFunction(userDocumentParser),
  pluginDocumentParser: awilix.asFunction(pluginDocumentParser),
  triggerBuilder: awilix.asFunction(triggerDomainBuilder)
});

module.exports = container;
