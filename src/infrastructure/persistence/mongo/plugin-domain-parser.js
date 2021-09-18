const Plugin = require('../../../domain/plugin/plugin');

const mongoDocumentParser = ({ muuid, triggerBuilder }) => {
  return {
    toDomain: ({
      _id,
      createdAt,
      name,
      ownerId,
      isPrivate,
      source,
      triggers,
      updatedAt }) => {
      const id = (muuid.from(_id)).toString();
      return new Plugin({
        id,
        name,
        ownerId,
        isPrivate,
        source,
        triggers: triggerBuilder.build(triggers),
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
      triggers,
      updatedAt }) => {
      const _id = muuid.from(id);
      return {
        _id,
        createdAt,
        name,
        ownerId,
        isPrivate,
        source,
        triggers: triggerBuilder.make(triggers),
        updatedAt
      };
    },
  };
};

module.exports = mongoDocumentParser;
