const { PORT } = require('./common/config');
const app = require('./app');
const generateDB = require('./DB/fakeDB');
const { logHandler } = require('./handlers');

process
  .on('uncaughtException', error => {
    console.log('uncaughtException');
    logHandler({ error });
    const exit = process.exit;
    exit(1);
  })
  .on('unhandledRejection', warning => {
    console.log('unhandledRejection');
    logHandler({ warning });
  });

generateDB();

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
