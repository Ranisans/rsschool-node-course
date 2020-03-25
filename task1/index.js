const { program } = require('commander');

const controlArguments = require('./controlArguments');

program
  .requiredOption('-s, --shift <type>', 'cipher shift, integer argument')
  .requiredOption('-a, --action <type>', 'encode/decode action')
  .option(
    '-i, --input <string>',
    'input file path, if not set - write your message in console'
  )
  .option(
    '-o, --output <string',
    'output file path, if not set - show your message in console'
  );

program.on('-h, --help', () => {
  console.log('help');
});

program.parse(process.argv);

controlArguments(program);
