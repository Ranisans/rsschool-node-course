const router = require('express').Router();

const {
  getAllUser,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById
} = require('./logic');
const { OK_NO_CONTENT, ERROR, NOT_FOUND } = require('../../statusCodes');
const { ErrorHandler } = require('../../handlers');

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = getUserById(id);
      if (user === undefined) {
        throw new ErrorHandler(NOT_FOUND, 'Not Found');
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, login, password } = req.body;
      if (name === undefined && login === undefined && password === undefined) {
        throw new ErrorHandler(ERROR, 'Bad request');
      }
      const result = updateUserById({ id, name, login, password });
      if (!result) {
        throw new ErrorHandler(ERROR, 'Bad request');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = deleteUserById(id);
      if (result) {
        res.sendStatus(OK_NO_CONTENT);
        return;
      }
      throw new ErrorHandler(NOT_FOUND, 'Not Found');
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      res.json(getAllUser());
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, login, password } = req.body;
      if (name === undefined || login === undefined || password === undefined) {
        throw new ErrorHandler(ERROR, 'Bad request');
      }
      const result = addNewUser({ name, login, password });
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
