class RedisPubSubMessage {
  constructor({redisDbHandler, promisify}) {
    this.redisDbHandler = redisDbHandler;
    this.promisify = promisify;
  }

  async publish({channel, message}) {
    const client = await this.redisDbHandler.getClient();
    const asyncPublish = this.promisify(client.publish).bind(client);

    try {
      await asyncPublish(channel, message);
    } catch (err) {
      console.log(err);
      throw new Error('Error while publishing message');
    }
  }

  async subscribe(channel) {
    const client = await this.redisDbHandler.getClient();
    const asyncSubscribe = this.promisify(client.subscribe).bind(client);

    try {
      await asyncSubscribe(channel);
    } catch (err) {
      console.log(err);
      throw new Error('Error while subscribing channel');
    }
  }

  async listen(cb) {
    try {
      await this.redisDbHandler.onMessage(function(channel, message) {
        cb(channel, message);
      });
    } catch (err) {
      console.log(err);
      throw new Error('Error while listening channel');
    }
  }
}

module.exports = RedisPubSubMessage;
