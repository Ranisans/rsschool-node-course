const fs = require('fs');

exports.createReadStream = filename => {
  return fs.createReadStream(filename);
};

exports.createWriteStream = filename => {
  return fs.createWriteStream(filename);
};
