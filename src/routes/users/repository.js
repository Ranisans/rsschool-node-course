const { User } = require('../../DB/models');
const { unassignTaskByUserId } = require('../tasks/repository');

exports.getAllUser = async () => {
  const users = await User.find({}).exec();
  return users.map(user => User.toResponse(user));
};

exports.getUserById = async id => {
  const user = await User.findById(id).exec();
  if (user) {
    return User.toResponse(user);
  }
  return undefined;
};

exports.addNewUser = async ({ name, login, password }) => {
  const user = await User.create({ name, login, password });
  if (user) {
    return User.toResponse(user);
  }
  return undefined;
};

exports.updateUserById = async ({ id, name, login, password }) => {
  return User.updateOne({ _id: id }, { $set: { name, login, password } });
};

exports.deleteUserById = async id => {
  const result = await User.deleteOne({ _id: id });
  if (result.n) {
    await unassignTaskByUserId(id);
    return true;
  }
  return false;
};
