const env = process.env.NODE_ENV;

const run = {
  server: {
    port: process.env.PORT || 3000,
    host: `https://localhost:/${process.env.PORT}`,
  },
  redis: {
    redisAttempts: process.env.REDIS_ATTEMPTS || 10,
    redisTimeOut: process.env.REDIS_TIMEOUT || 60,
    redisConnectionUri: process.env.REDIS_CONNECTION || 'redis://127.0.0.1/',
    authCodeExpiration: process.env.AUTH_CODE_EXPIRATION || 7200,
  },
  tokenSigner:{
    cryptoKey: process.env.TOKEN_SIGNATURE || 'HQdbSM6Wfcd6rseArxTmQeR8RxBNj6dyUm3RNFQQQWdcmpxtqpWZcB4xErCBjQXMcWe66vHFj4Gxq'
  },
  mongo: {
    mongoConnectionUri: `mongodb://localhost:27017/deliriumCG`,
    dbName: process.env.MONGO_DB_NAME || 'deliriumCG',
    userCollectionName: process.env.MONGO_DB_NAME || 'users',
    timeout: 5000,
  }
};

const test = {
  server: {
    port: process.env.PORT || 3000,
    host: `https://localhost:/${process.env.PORT}`,
  },
  redis: {
    redisAttempts: process.env.REDIS_ATTEMPTS || 10,
    redisTimeOut: process.env.REDIS_TIMEOUT || 60,
    redisConnectionUri: process.env.REDIS_CONNECTION || 'localhost:6379',
    authCodeExpiration: process.env.AUTH_CODE_EXPIRATION || 7200,
  },
  tokenSigner:{
    cryptoKey: process.env.TOKEN_SIGNATURE || 'HQdbSM6Wfcd6rseArxTmQeR8RxBNj6dyUm3RNFQQQWdcmpxtqpWZcB4xErCBjQXMcWe66vHFj4Gxq'
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];
