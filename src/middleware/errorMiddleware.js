const { handleError } = require('../handlers/errorHandler');

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  handleError(err, req, res);
};

module.exports = errorMiddleware;
