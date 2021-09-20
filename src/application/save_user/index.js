const SaveUserResponse = require('./save-user-response');
const User = require('../../domain/user/user');

class SaveUser {
  constructor({ idGenerator, TokenGenerator, userRepository }) {
    this.idGenerator = idGenerator;
    this.TokenGenerator = TokenGenerator;
    this.userRepository = userRepository;
  }

  async save({ twitchUsername }) {
    const id = this.idGenerator.generate();
    const token = await this.TokenGenerator.generate({ id })
    const currentDate = new Date();
    const userDomain = new User({ id, token, twitchUsername, createdAt: currentDate, updatedAt: currentDate });

    this.userRepository.save(userDomain)

    return new SaveUserResponse({ id: userDomain.id, token });
  }
}

module.exports = SaveUser;
