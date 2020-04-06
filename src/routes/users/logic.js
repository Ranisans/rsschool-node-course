const {
  addNewUser,
  deleteUserById,
  getAllUser,
  getUserById,
  updateUserById
} = require('./repository');

exports.getAllUser = () => {
  return getAllUser();
};

exports.getUserById = id => {
  return getUserById(id);
};

exports.addNewUser = ({ name, login, password }) => {
  return addNewUser({ name, login, password });
};

exports.updateUserById = ({ id, name, login, password }) => {
  return updateUserById({ id, name, login, password });
};

exports.deleteUserById = id => {
  return deleteUserById(id);
};
