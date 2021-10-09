class GetUserResponse {
  constructor({id, token, twitchUsername, plugins}) {
    this.id = id;
    this.token = token;
    this.twitchUsername = twitchUsername;
    this.plugins = plugins;
  }
}

module.exports = GetUserResponse;
