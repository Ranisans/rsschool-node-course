const { SERVER_ERROR } = require('../statusCodes');
const { logHandler } = require('./logHandler');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res) => {
  const { statusCode, message } = err;

  if (statusCode === null || message === undefined) {
    const { url, method, body, params } = req;
    logHandler({
      error: true,
      message: `Server Error with request: ${(url, method, body, params)}`
    });
    res.status(SERVER_ERROR).json({
      status: 'error',
      statusCode: SERVER_ERROR,
      message: 'Server Error'
    });
    return;
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = { ErrorHandler, handleError };
