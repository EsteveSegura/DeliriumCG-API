const awilix = require('awilix');

const {promisify} = require('util');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const JwtGenerator = require('./infrastructure/services/jwt-generator');
const TwitchClient = require('./infrastructure/services/twitch-client');
const idGenerator = require('./domain/services/id-generator');
const MUUID = require('uuid-mongodb');
const MongoUserRepository = require('./infrastructure/persistence/mongo/mongo-user-repository')
const MongoPluginRepository = require('./infrastructure/persistence/mongo/mongo-plugin-repository')
const saveUser = require('./application/save_user/index');
const savePlugin = require('./application/save_plugin/index');
const getPlugin = require('./application/get_plugin/index');
const displayPlugin = require('./application/display_plugin/index');
const triggerPulse = require('./application/trigger_pulse/index');
const authUser = require('./application/auth_user/');
const getUser = require('./application/get_user');
const transferPlugin = require('./application/transfer_plugin')
const listPlugins = require('./application/list_plugins')
const mongoDbHandler = require('./infrastructure/persistence/mongo/db-handler');
const RedisDbHandler = require('./infrastructure/pubsub/redis-handler');
const userDocumentParser = require('./infrastructure/persistence/mongo/user-document-parser');
const pluginDocumentParser = require('./infrastructure/persistence/mongo/plugin-domain-parser');
const triggerDomainBuilder = require('./infrastructure/persistence/mongo/trigger-domain-builder');
const redisPubSubMessage = require('./infrastructure/pubsub/redis-pubsub-message')
const coreInjectable = require('./infrastructure/services/core-injectable');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  promisify: awilix.asValue(promisify),
  uuidv4: awilix.asValue(uuidv4),
  axios: awilix.asValue(axios),
  crypto: awilix.asValue(crypto),
  jwt: awilix.asValue(jsonwebtoken),
  TwitchClient: awilix.asClass(TwitchClient),
  TokenGenerator: awilix.asClass(JwtGenerator),
  idGenerator: awilix.asFunction(idGenerator),
  muuid: awilix.asValue(MUUID),
  userRepository: awilix.asClass(MongoUserRepository),
  pluginRepository: awilix.asClass(MongoPluginRepository),
  saveUser: awilix.asClass(saveUser),
  savePlugin: awilix.asClass(savePlugin),
  getPlugin: awilix.asClass(getPlugin),
  displayPlugin: awilix.asClass(displayPlugin),
  triggerPulse: awilix.asClass(triggerPulse),
  authUser: awilix.asClass(authUser),
  getUser: awilix.asClass(getUser),
  transferPlugin: awilix.asClass(transferPlugin),
  listPlugins: awilix.asClass(listPlugins),
  mongoDbHandler: awilix.asFunction(mongoDbHandler).singleton(),
  redisDbHandler: awilix.asClass(RedisDbHandler),
  userDocumentParser: awilix.asFunction(userDocumentParser),
  pluginDocumentParser: awilix.asFunction(pluginDocumentParser),
  triggerBuilder: awilix.asFunction(triggerDomainBuilder),
  redisPubSubMessage: awilix.asClass(redisPubSubMessage),
  coreInjectable: awilix.asClass(coreInjectable),
});

module.exports = container;
