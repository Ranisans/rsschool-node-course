const { PORT } = require('./common/config');
const app = require('./app');
const generateDB = require('./DB/fakeDB');
const { logHandler } = require('./handlers');

process
  .on('uncaughtException', error => {
    logHandler({ error });
  })
  .on('unhandledRejection', warning => {
    logHandler({ warning });
  });

generateDB();

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
