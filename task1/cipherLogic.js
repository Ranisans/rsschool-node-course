const { pipeline } = require('stream');

const { createReadStream, createWriteStream } = require('./fileLogic');
const { FILE_ERROR } = require('./constant');
const EncodeDecode = require('./encodeDecode');

const cipherLogic = async argumentsData => {
  const input = argumentsData.input;
  const source = input ? await createReadStream(input) : process.stdin;
  const output = argumentsData.output;
  const destination = output ? createWriteStream(output) : process.stdout;

  pipeline(
    source,
    new EncodeDecode({
      shift: argumentsData.shift,
      action: argumentsData.action
    }),
    destination,
    err => {
      if (err) {
        console.error('Pipeline failed.', FILE_ERROR);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
};

module.exports = cipherLogic;
