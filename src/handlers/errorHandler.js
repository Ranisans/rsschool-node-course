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
    console.log('handleError -> err', err);
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

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = { ErrorHandler, handleError };
