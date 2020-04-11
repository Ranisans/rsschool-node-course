const HttpStatus = require('http-status-codes');

const middleware = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true
    });
    const valid = error === undefined;

    if (valid) {
      // eslint-disable-next-line callback-return
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');

      res.status(HttpStatus.BAD_REQUEST).json({ error: message });
    }
  };
};
module.exports = middleware;
