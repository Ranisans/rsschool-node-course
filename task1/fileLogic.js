const fs = require('fs');
const fsPromises = fs.promises;

const { FILE_READ_ERROR, FILE_WRITE_ERROR } = require('./constant');
const exit = require('./exit');

const checkReadWrite = (filename, stream, isRead) => {
  const mode = isRead ? fs.constants.R_OK : fs.constants.W_OK;
  const error_msg = isRead ? FILE_READ_ERROR : FILE_WRITE_ERROR;
  return fsPromises
    .access(filename, mode)
    .then(() => fsPromises.lstat(filename))
    .then(result => {
      if (result.isDirectory()) {
        throw Error();
      }
      return true;
    })
    .then(() => {
      return stream(filename);
    })
    .catch(() => {
      console.log(error_msg);
      exit();
    });
};

exports.createReadStream = async filename => {
  return checkReadWrite(filename, fs.createReadStream, true);
};

exports.createWriteStream = async filename => {
  return checkReadWrite(filename, fs.createWriteStream, false);
};
