const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./routes/users/router');
const boardsRouter = require('./routes/boards/router');
const authenticationRouter = require('./routes/authentication/router');
const { logMiddleware, errorMiddleware, withAuth } = require('./middleware');
const { ErrorHandler } = require('./handlers');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(logMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', authenticationRouter);

// before it - not need a token
app.use(withAuth);
// after it - token needed

app.use('/users', userRouter);
app.use('/boards', boardsRouter);

app.get('/crash-promise', (req, res) => {
  Promise.reject({ message: 'catch me with unhandledRejection' });
  res.send('You catch me with unhandledRejection, because Promise rejected');
});

app.get('/crash-500', () => {
  throw new Error('uncaught exception');
});

app.use('*', () => {
  throw new ErrorHandler(404, "Path doesn't exist.");
});

app.use(errorMiddleware);

module.exports = app;
