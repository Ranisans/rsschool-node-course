const logHandler = require('../logHandler');

const logMiddleware = (req, res, next) => {
  const { url, method, body, params } = req;
  const logMessage = JSON.stringify({ url, method, body, params });
  logHandler({ message: logMessage });
  next();
};

module.exports = logMiddleware;
