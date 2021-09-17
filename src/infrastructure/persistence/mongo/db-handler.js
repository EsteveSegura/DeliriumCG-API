const {MongoClient: mongo} = require('mongodb');
const {mongo: {mongoConnectionUri, dbName, timeout}} = require('../../config');
let db;
let client;
let instance;

const _connect = async () => {
  try {
    client = await mongo.connect(mongoConnectionUri,
        {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: timeout});
    db = await client.db(dbName);
    return db;
  } catch (err) {
    const error = err.message ? err.message : err;
    console.error(`Error in database connection: ${error}`);
    throw new Error(`Error in database connection: ${error}`);
  }
};

const MongoDbHandler = (() => {
  const createInstance = async () => {
    const db = await _connect();

    db.collection('users').createIndexes([
      {name: '_id', key: {_id: 1}},
    ], function(err, result) {
      console.log(result);
    });

    db.collection('plugins').createIndexes([
      {name: '_id', key: {_id: 1}},
    ], function(err, result) {
      console.log(result);
    });

    return db;
  };

  return {
    getInstance: async () => {
      if (!instance) {
        instance = await createInstance();
      }
      return instance;
    },
    disconnect: () => {
      if (client) {
        client.close();
      }
      db = null;
      instance = null;
      client = null;
    },
  };
});

module.exports = MongoDbHandler;
