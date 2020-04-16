const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.static('toResponse', user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
});

const User = mongoose.model('User', userSchema);

module.exports = User;
