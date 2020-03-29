const { pipeline } = require('stream');

const { createReadStream, createWriteStream } = require('./fileLogic');
const { STDIN_MESSAGE } = require('./constant');
const EncodeDecode = require('./encodeDecode');

const cipherLogic = async argumentsData => {
  const input = argumentsData.input;
  let source;
  if (input) {
    source = await createReadStream(input);
  } else {
    console.log(STDIN_MESSAGE);
    source = process.stdin;
  }
  const output = argumentsData.output;
  const destination = output ? await createWriteStream(output) : process.stdout;

  pipeline(
    source,
    new EncodeDecode({
      shift: argumentsData.shift,
      action: argumentsData.action
    }),
    destination,
    err => {
      if (err) {
        console.error('Pipeline failed.');
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
};

module.exports = cipherLogic;
