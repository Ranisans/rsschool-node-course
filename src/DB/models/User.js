const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
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

userSchema.pre('validate', function callback(next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt((err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error);

      this.password = hash;
      next();
    });
  });
});

userSchema.static('toResponse', user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
});

userSchema.methods.comparePassword = async function comparePassword(password) {
  const match = await bcrypt.compare(password, this.password);
  if (match) {
    return { userId: this._id, login: this.login };
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
