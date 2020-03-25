const {
  DECODE,
  ENCODE,
  ACTION_ARGUMENT_ERROR,
  SHIFT_ARGUMENT_ERROR
} = require('./constant');
const exit = require('./exit');

const controlArguments = program => {
  const result = {};
  if (![DECODE, ENCODE].includes(program.action)) {
    console.error(ACTION_ARGUMENT_ERROR);
    exit();
  }
  result.action = program.action;
  if (isNaN(parseInt(program.shift, 10))) {
    console.error(SHIFT_ARGUMENT_ERROR);
    exit();
  }
  result.shift = program.shift;
  result.input = program.input ? program.input : false;
  result.output = program.output ? program.output : false;
  return result;
};

module.exports = controlArguments;
