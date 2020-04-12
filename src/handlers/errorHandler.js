const HttpStatus = require('http-status-codes');

const logHandler = require('./logHandler');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res) => {
  const { statusCode, message } = err;
  if (statusCode === undefined || message === undefined) {
    logHandler({
      error: err
    });
    res.status(HttpStatus.SERVER_ERROR).json({
      status: 'error',
      statusCode: HttpStatus.SERVER_ERROR,
      message: 'Server Error'
    });
    const exit = process.exit;
    exit(1);
  }
  const { url, method, body, params } = req;
  logHandler({
    warning: { message, url, method, body, params }
  });

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = { ErrorHandler, handleError };
