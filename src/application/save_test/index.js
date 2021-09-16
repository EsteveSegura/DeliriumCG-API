const SaveTestResponse = require('./save-test-response');
const Test = require('../../domain/test/test');

class SaveTest {
  constructor({idGenerator}) {
    this.idGenerator = idGenerator;
  }

  async save({text}) {
    const id = this.idGenerator.generate();
    const currentDate = new Date();
    const testDomain = new Test({id, text, createdAt: currentDate, updatedAt: currentDate});

    return new SaveTestResponse({id: testDomain.id});
  }
}

module.exports = SaveTest;
