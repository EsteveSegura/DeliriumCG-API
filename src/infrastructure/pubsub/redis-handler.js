const redis = require('redis');
const {redis: {redisConnectionUri, redisAttempts, redisTimeOut}} = require('../config');

class RedisHandler {
  constructor({logger}) {
    this._logger = logger;
  }

  async getClient() {
    if (!this._client || !this._client.connected) {
      this._client = redis.createClient(redisConnectionUri, {retry_strategy: function(options) {
        if (options.total_retry_time > redisTimeOut) {
          return new Error('Retry time exhausted');
        }
        if (options.attempt > redisAttempts) {
          return new Error('Attempts exhausted');
        }

        return Math.min(options.attempt * 100, 3000);
      }});

      this._client.on('error', ({message}) => {
        this._logger.error(message);
      });
    }
    return this._client;
  }

  async disconnect() {
    if (this._client) {
      this._client.end(true);
    }

    this._client = null;
  }
}

module.exports = RedisHandler;