const MUUID = require('uuid-mongodb');
const PluginRepository = require('../../../domain/plugin/service/plugin-repository');

class MongoPluginRepository extends PluginRepository {
  constructor({mongoDbHandler, pluginDocumentParser}) {
    super();
    this.mongoDbHandler = mongoDbHandler;
    this.pluginDocumentParser = pluginDocumentParser;
  }

  async find(id) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const pluginDocument = await db.collection('plugins').findOne({_id: MUUID.from(id)});
      return pluginDocument ? this.pluginDocumentParser.toDomain(pluginDocument) : null;
    } catch ({message}) {
      throw new Error(message);
    }
  }

  async findByOwnerId(ownerId) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const pluginDocuments = await db.collection('plugins').find({ownerId}).toArray();

      return pluginDocuments.length !== 0 ? pluginDocuments.map((document) => this.pluginDocumentParser.toDomain(document)) : [];
    } catch ({message}) {
      throw new Error(message);
    }
  }

  async findByAccountId(accountId) {
    const db = await this.mongoDbHandler.getInstance();
    const pluginDocument = await db.collection('plugins').findOne({accountId});
    return pluginDocument ? this.pluginDocumentParser.toDomain(pluginDocument) : null;
  }

  async findByChannelId(channelId) {
    const db = await this.mongoDbHandler.getInstance();
    const pluginDocument = await db.collection('plugins').findOne({channelId});

    return pluginDocument ? this.pluginDocumentParser.toDomain(pluginDocument) : null;
  }

  async findAllByChannelId(channelId) {
    const db = await this.mongoDbHandler.getInstance();
    const documents = await db.collection('plugins').find({channelId}).toArray();

    return documents.length !== 0 ? documents.map((document) => this.pluginDocumentParser.toDomain(document)) : [];
  }

  async update(plugin) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      await db.collection('plugins').replaceOne({_id: MUUID.from(plugin.id)}, this.pluginDocumentParser.toDocument(plugin));
    } catch ({message}) {
      throw new Error(message);
    }
  }

  async save(plugin) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const pluginDocument = this.pluginDocumentParser.toDocument(plugin);
      await db.collection('plugins').insertOne(pluginDocument);

      return Promise.resolve();
    } catch ({message}) {
      throw new Error(message);
    }
  }
  async delete(id) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      await db.collection('plugins').deleteOne({_id: MUUID.from(id)});
    } catch ({message}) {
      throw new Error(message);
    }
  }
}

module.exports = MongoPluginRepository;
