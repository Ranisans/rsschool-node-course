const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const {
  getAllUser,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById
} = require('./logic');
const { ErrorHandler } = require('../../handlers');

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      if (user === undefined) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
        );
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
        throw new ErrorHandler(
          HttpStatus.BAD_REQUEST,
          HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
        );
      }
      const result = await updateUserById({ id, name, login, password });
      if (!result) {
        throw new ErrorHandler(
          HttpStatus.BAD_REQUEST,
          HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
        );
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteUserById(id);
      if (result) {
        res.sendStatus(HttpStatus.NO_CONTENT);
        return;
      }
      throw new ErrorHandler(
        HttpStatus.NOT_FOUND,
        HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
      );
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      res.json(await getAllUser());
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, login, password } = req.body;
      if (name === undefined || login === undefined || password === undefined) {
        throw new ErrorHandler(
          HttpStatus.BAD_REQUEST,
          HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
        );
      }
      const result = await addNewUser({ name, login, password });
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
