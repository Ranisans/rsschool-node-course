const { program } = require('commander');

const controlArguments = require('./controlArguments');
const cipherLogic = require('./cipherLogic');

program
  .requiredOption('-s, --shift <type>', 'cipher shift, integer argument')
  .requiredOption('-a, --action <type>', 'encode/decode action')
  .option(
    '-i, --input <string>',
    'input file path, if not set - write your message in console'
  )
  .option(
    '-o, --output <string',
    'output file path (need to be created before running the utility), if not set - show your message in console'
  );

program.on('-h, --help', () => {
  console.log('help');
});

program.parse(process.argv);

const argumentsData = controlArguments(program);
cipherLogic(argumentsData);
