const uuid = require('uuid');

const { users } = require('../../DB/tables');
const { User } = require('../../DB/models');

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
  let position;
  const user = users.filter((singleUser, index) => {
    if (singleUser.id === id) {
      position = index;
      return true;
    }
    return false;
  })[0];

  if (user === undefined) {
    return false;
  }

  const newUser = {};
  newUser.id = id;
  newUser.name = name ? name : user.name;
  newUser.login = login ? login : user.login;
  newUser.password = password ? password : user.password;

  users[position] = newUser;

  return User.toResponse(newUser);
};

exports.deleteUserById = id => {
  // TODO delete all task with this user-id
  let position;
  const user = users.filter((singleUser, index) => {
    if (singleUser.id === id) {
      position = index;
      return true;
    }
    return false;
  })[0];

  if (user === undefined) {
    return false;
  }

  users.splice(position, 1);
  return true;
};
