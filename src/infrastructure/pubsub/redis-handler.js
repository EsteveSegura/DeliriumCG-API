const redis = require('redis');
const {redis: {redisConnectionUri, redisAttempts, redisTimeOut}} = require('../config');

class RedisHandler {
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
        console.log(message);
      });
    }
    return this._client;
  }

  onMessage(cb) {
    try {
      this._client.on('message', function(channel, message) {
        cb(channel, message);
      });
    } catch (err) {
      throw err;
    }
  }

  async disconnect() {
    if (this._client) {
      this._client.end(true);
    }

    this._client = null;
  }
}

module.exports = RedisHandler;
