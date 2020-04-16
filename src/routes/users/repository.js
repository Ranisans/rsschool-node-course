/* eslint-disable no-unused-vars */
const uuid = require('uuid');

const { User } = require('../../DB/models');

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
  return User.deleteOne({ _id: id });
  // TODO add deletion user's tasks
};
