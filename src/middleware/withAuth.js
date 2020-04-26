const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const HttpStatus = require('http-status-codes');

const { ErrorHandler } = require('../handlers');
const { JWT_SECRET_KEY } = require('../common/config');

const jwtVerify = promisify(jwt.verify);

const withAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (auth && auth.split(' ')[0] === 'Bearer') {
      const token = auth.split(' ')[1];
      try {
        await jwtVerify(token, JWT_SECRET_KEY);
      } catch (error) {
        throw new ErrorHandler(
          HttpStatus.UNAUTHORIZED,
          HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)
        );
      }
      return next();
    }
    throw new ErrorHandler(
      HttpStatus.UNAUTHORIZED,
      HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)
    );
  } catch (error) {
    next(error);
  }
};

module.exports = withAuth;
