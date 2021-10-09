class TwitchClient {
  constructor({axios}) {
    this.axios = axios;
  }

  async authVerify(accessToken) {
    try {
      const response = await this.axios.get(`https://id.twitch.tv/oauth2/validate`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TwitchClient;
