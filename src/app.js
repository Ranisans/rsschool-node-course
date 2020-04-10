const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./routes/users/router');
const boardsRouter = require('./routes/boards/router');
const { logMiddleware, errorMiddleware } = require('./middleware');
const { ErrorHandler } = require('./handlers');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardsRouter);

app.use('*', () => {
  throw new ErrorHandler(404, "Path doesn't exist.");
});

app.use(logMiddleware);
app.use(errorMiddleware);

module.exports = app;
