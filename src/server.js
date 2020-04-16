const { PORT } = require('./common/config');
const app = require('./app');
const connectToDB = require('./DB/mongoDB');
const { logHandler } = require('./handlers');

process
  .on('uncaughtException', error => {
    logHandler({ error });
  })
  .on('unhandledRejection', warning => {
    logHandler({ warning });
  });

const startExpressServer = () => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
};

connectToDB(startExpressServer);
