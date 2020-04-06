const { ERROR } = require('../statusCodes');

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

      console.log('error', message);
      res.status(ERROR).json({ error: message });
    }
  };
};
module.exports = middleware;
