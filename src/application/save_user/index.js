const SaveUserResponse = require('./save-user-response');
const User = require('../../domain/user/user');

class SaveUser {
  constructor({idGenerator, userRepository}) {
    this.idGenerator = idGenerator;
    this.userRepository = userRepository;
  }

  async save({text}) {
    const id = this.idGenerator.generate();
    const currentDate = new Date();
    const userDomain = new User({id, text, createdAt: currentDate, updatedAt: currentDate});
    
    this.userRepository.save(userDomain)

    return new SaveUserResponse({id: userDomain.id});
  }
}

module.exports = SaveUser;
