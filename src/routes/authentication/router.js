const router = require('express').Router();
const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');

const middleware = require('../joiMiddleware');
const { loginLogic, createToken } = require('./logic');
const { ErrorHandler } = require('../../handlers');

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
});

router.route('/').post(middleware(loginSchema), async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const result = await loginLogic(login, password);
    if (!result) {
      throw new ErrorHandler(
        HttpStatus.FORBIDDEN,
        HttpStatus.getStatusText(HttpStatus.FORBIDDEN)
      );
    }
    const token = await createToken(result);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
