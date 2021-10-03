const SaveUserResponse = require('./save-user-response');
const User = require('../../domain/user/user');

class SaveUser {
  constructor({ idGenerator, TokenGenerator, userRepository, TwitchClient }) {
    this.idGenerator = idGenerator;
    this.TokenGenerator = TokenGenerator;
    this.userRepository = userRepository;
    this.TwitchClient = TwitchClient;
  }

  async save({ twitchToken }) {
    const twitchUser = await this.TwitchClient.authVerify(twitchToken)
    const checkIfExists = await this._checkIfUserAlreadyExists(twitchUser.login)

    if(checkIfExists){
      return checkIfExists;
    }

    const id = this.idGenerator.generate();
    const token = await this.TokenGenerator.generate({ id })
    const currentDate = new Date();
    const userDomain = new User({ id, token, twitchUsername: twitchUser.login, createdAt: currentDate, updatedAt: currentDate });

    this.userRepository.save(userDomain)

    return new SaveUserResponse({ id: userDomain.id, token });
  }

  async _checkIfUserAlreadyExists(twitchUser){
    const findUserByNickName = await this.userRepository.findByTwitchName(twitchUser)

    if(findUserByNickName){
      return new SaveUserResponse({ id: findUserByNickName.id, token: findUserByNickName.token });
    }
  }
}

module.exports = SaveUser;
