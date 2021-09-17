const User = require('../../../domain/user/user');

const mongoDocumentParser = ({muuid}) => {
  return {
    toDomain: ({
      _id,
      token,
      createdAt,
      updatedAt}) => {
      const id = (muuid.from(_id)).toString();
      return new User({
        id,
        token,
        createdAt,
        updatedAt});
    },
    toDocument: ({
      id,
      token,
      createdAt,
      updatedAt}) => {
      const _id = muuid.from(id);
      return {
        _id,
        token,
        createdAt,
        updatedAt};
    },
  };
};

module.exports = mongoDocumentParser;
