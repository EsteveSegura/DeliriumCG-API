const Plugin = require('../../../domain/plugin/plugin');

const mongoDocumentParser = ({ muuid }) => {
  return {
    toDomain: ({
      _id,
      createdAt,
      name,
      ownerId,
      isPrivate,
      source,
      updatedAt }) => {
      const id = (muuid.from(_id)).toString();
      return new Plugin({
        id,
        name,
        ownerId,
        isPrivate,
        source,
        createdAt,
        updatedAt
      });
    },
    toDocument: ({
      id,
      createdAt,
      name,
      ownerId,
      isPrivate,
      source,
      updatedAt }) => {
      const _id = muuid.from(id);
      return {
        _id,
        createdAt,
        name,
        ownerId,
        isPrivate,
        source,
        updatedAt
      };
    },
  };
};

module.exports = mongoDocumentParser;
