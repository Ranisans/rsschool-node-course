const router = require('express').Router();
const Joi = require('@hapi/joi');

const middleware = require('../joiMiddleware');
const taskRouter = require('../tasks/router');
const { ErrorHandler } = require('../../handlers');

const boardSchema = Joi.object({
  title: Joi.string().required(),
  columns: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      title: Joi.string().required(),
      order: Joi.number().required()
    })
  )
});

const {
  addNewBoard,
  deleteBoardById,
  getAllBoard,
  getBoardById,
  updateBoardById
} = require('./logic');
const { OK_NO_CONTENT, ERROR, NOT_FOUND } = require('../../statusCodes');

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const board = getBoardById(id);
      if (!board) {
        throw new ErrorHandler(NOT_FOUND, 'Not Found');
      }
      res.json(board);
    } catch (error) {
      next(error);
    }
  })
  .put(middleware(boardSchema), async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, columns } = req.body;
      const result = updateBoardById({ id, title, columns });
      if (!result) {
        throw new ErrorHandler(NOT_FOUND, 'Not Found');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = deleteBoardById(id);
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
      res.json(getAllBoard());
    } catch (error) {
      next(error);
    }
  })
  .post(middleware(boardSchema), async (req, res, next) => {
    try {
      const { title, columns } = req.body;
      const result = addNewBoard({ title, columns });
      if (!result) {
        throw new ErrorHandler(ERROR, 'Bad request');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

router.use(
  '/:id/tasks',
  (req, res, next) => {
    req.body.boardId = req.params.id;
    next();
  },
  taskRouter
);

module.exports = router;
