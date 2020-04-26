const { User } = require('../../DB/models');

const checkUserAuth = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) return false;
  return user.comparePassword(password);
};

module.exports = { checkUserAuth };
