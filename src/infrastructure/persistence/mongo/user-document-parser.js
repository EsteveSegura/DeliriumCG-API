const User = require('../../../domain/user/user');

const mongoDocumentParser = ({muuid}) => {
  return {
    toDomain: ({
      _id,
      createdAt,
      updatedAt}) => {
      const id = (muuid.from(_id)).toString();
      return new User({
        id,
        createdAt,
        updatedAt});
    },
    toDocument: ({
      id,
      createdAt,
      updatedAt}) => {
      const _id = muuid.from(id);
      return {
        _id,
        createdAt,
        updatedAt};
    },
  };
};

module.exports = mongoDocumentParser;
