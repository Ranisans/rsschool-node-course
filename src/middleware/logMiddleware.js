const logHandler = require('../logHandler');

const logMiddleware = (req, res, next) => {
  const { url, method, body, params } = req;
  logHandler({ message: { url, method, body, params } });
  next();
};

module.exports = logMiddleware;
