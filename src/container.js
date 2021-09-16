const awilix = require('awilix');

const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const idGenerator = require('./domain/services/id-generator');
const tokenGenerator = require('./domain/services/token-generator');
const saveTest = require('./application/save_test/index');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  uuidv4: awilix.asValue(uuidv4),
  crypto: awilix.asValue(crypto),
  idGenerator: awilix.asFunction(idGenerator),
  tokenGenerator: awilix.asFunction(tokenGenerator),
  saveTest: awilix.asClass(saveTest),
});

module.exports = container;
