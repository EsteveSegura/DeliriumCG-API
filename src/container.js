const awilix = require('awilix');

const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const idGenerator = require('./domain/services/id-generator');
const tokenGenerator = require('./domain/services/token-generator');
const MUUID = require('uuid-mongodb');
const MongoUserRepository = require('./infrastructure/persistence/mongo/mongo-user-repository')
const saveUser = require('./application/save_user/index');
const mongoDbHandler = require('./infrastructure/persistence/mongo/db-handler');
const userDocumentParser = require('./infrastructure/persistence/mongo/user-document-parser');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  uuidv4: awilix.asValue(uuidv4),
  crypto: awilix.asValue(crypto),
  idGenerator: awilix.asFunction(idGenerator),
  tokenGenerator: awilix.asFunction(tokenGenerator),
  muuid: awilix.asValue(MUUID),
  userRepository: awilix.asClass(MongoUserRepository),
  saveUser: awilix.asClass(saveUser),
  mongoDbHandler: awilix.asFunction(mongoDbHandler).singleton(),
  userDocumentParser: awilix.asFunction(userDocumentParser),
});

module.exports = container;
