const jwt = require('jsonwebtoken');

const { checkUserAuth } = require('./repository');
const { JWT_SECRET_KEY } = require('../../common/config');

const loginLogic = async (login, password) => {
  return await checkUserAuth(login, password);
};

const createToken = async userData => {
  const token = jwt.sign(userData, JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
  return token;
};

module.exports = { loginLogic, createToken };
