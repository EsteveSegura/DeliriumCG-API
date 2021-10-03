const MUUID = require('uuid-mongodb');
const UserRepository = require('../../../domain/user/service/user-repository');

class MongoUserRepository extends UserRepository {
  constructor({mongoDbHandler, userDocumentParser}) {
    super();
    this.mongoDbHandler = mongoDbHandler;
    this.userDocumentParser = userDocumentParser;
  }

  async find(id) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const userDocument = await db.collection('users').findOne({_id: MUUID.from(id)});
      return userDocument ? this.userDocumentParser.toDomain(userDocument) : null;
    } catch ({message}) {
      throw new Error(message);
    }
  }

  async findByTwitchName(twitchUsername) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const userDocument = await db.collection('users').findOne({twitchUsername});

      return userDocument ? this.userDocumentParser.toDomain(userDocument) : null;
    } catch ({message}) {
      throw new Error(message);
    }
  }

  async findByToken(token) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const userDocument = await db.collection('users').findOne({token});

      return userDocument ? this.userDocumentParser.toDomain(userDocument) : null;
    } catch ({message}) {
      throw new Error(message);
    }
  }

  async findByAccountId(accountId) {
    const db = await this.mongoDbHandler.getInstance();
    const userDocument = await db.collection('users').findOne({accountId});
    return userDocument ? this.userDocumentParser.toDomain(userDocument) : null;
  }

  async findByChannelId(channelId) {
    const db = await this.mongoDbHandler.getInstance();
    const userDocument = await db.collection('users').findOne({channelId});

    return userDocument ? this.userDocumentParser.toDomain(userDocument) : null;
  }

  async findAllByChannelId(channelId) {
    const db = await this.mongoDbHandler.getInstance();
    const documents = await db.collection('users').find({channelId}).toArray();

    return documents.length !== 0 ? documents.map((document) => this.userDocumentParser.toDomain(document)) : [];
  }

  async update(user) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      await db.collection('users').replaceOne({_id: MUUID.from(user.id)}, this.userDocumentParser.toDocument(user));
    } catch ({message}) {
      throw new Error(message);
    }
  }

  async save(user) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const userDocument = this.userDocumentParser.toDocument(user);
      await db.collection('users').insertOne(userDocument);

      return Promise.resolve();
    } catch ({message}) {
      throw new Error(message);
    }
  }
  async delete(id) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      await db.collection('users').deleteOne({_id: MUUID.from(id)});
    } catch ({message}) {
      throw new Error(message);
    }
  }
}

module.exports = MongoUserRepository;
