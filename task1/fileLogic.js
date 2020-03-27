const fs = require('fs');
const { promisify } = require('util');

const { FILE_ERROR } = require('./constant');
const exit = require('./exit');

const access = promisify(fs.access);

exports.createReadStream = async filename => {
  try {
    await access(filename, fs.constants.F_OK);
  } catch (error) {
    console.log(FILE_ERROR);
    exit();
  }
  return fs.createReadStream(filename);
};

exports.createWriteStream = filename => {
  return fs.createWriteStream(filename);
};
