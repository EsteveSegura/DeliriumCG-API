const Plugin = require('../../../domain/plugin/plugin');

const mongoDocumentParser = ({ muuid }) => {
  return {
    toDomain: ({
      _id,
      createdAt,
      name,
      source,
      updatedAt }) => {
      const id = (muuid.from(_id)).toString();
      return new Plugin({
        id,
        name,
        source,
        createdAt,
        updatedAt
      });
    },
    toDocument: ({
      id,
      createdAt,
      name,
      source,
      updatedAt }) => {
      const _id = muuid.from(id);
      return {
        _id,
        createdAt,
        name,
        source,
        updatedAt
      };
    },
  };
};

module.exports = mongoDocumentParser;
