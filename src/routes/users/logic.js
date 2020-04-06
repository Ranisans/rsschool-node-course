const uuid = require('uuid');

const { users } = require('../../DB/tables');
const { User } = require('../../DB/models');
const getSingleElementById = require('../logic');

exports.getAllUser = () => {
  return users.map(User.toResponse);
};

exports.getUserById = id => {
  return users.filter(user => user.id === id).map(User.toResponse)[0];
};

exports.addNewUser = ({ name, login, password }) => {
  const id = uuid();
  users.push({ id, name, login, password });
  return { id, name, login };
};

exports.updateUserById = ({ id, name, login, password }) => {
  const [user, position] = getSingleElementById(users, id);

  if (user === undefined) {
    return false;
  }

  const newUser = { id, name, login, password };

  users[position] = newUser;

  return User.toResponse(newUser);
};

exports.deleteUserById = id => {
  // TODO delete all task with this user-id

  const [user, position] = getSingleElementById(users, id);

  if (user === undefined) {
    return false;
  }

  users.splice(position, 1);
  return true;
};
