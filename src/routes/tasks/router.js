const router = require('express').Router();
const Joi = require('@hapi/joi');

const middleware = require('../joiMiddleware');
const { ErrorHandler } = require('../../handlers');

const {
  addNewTask,
  deleteTaskById,
  getAllTasksByBoardId,
  getTaskById,
  updateTaskById
} = require('./logic');
const { OK_NO_CONTENT, ERROR, NOT_FOUND } = require('../../statusCodes');

const taskUpdateSchema = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().allow(null),
  userId: Joi.string().allow(null),
  columnId: Joi.string().allow(null)
});

router
  .route('/:taskId')
  .get(async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = getTaskById(taskId);
      if (!task) {
        throw new ErrorHandler(NOT_FOUND, 'Not Found');
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  })
  .put(middleware(taskUpdateSchema), async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const { title, order, description, userId, boardId, columnId } = req.body;
      const result = updateTaskById({
        id: taskId,
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      });

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
      const { taskId } = req.params;
      const result = deleteTaskById(taskId);
      res.sendStatus(result ? OK_NO_CONTENT : NOT_FOUND);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const { boardId } = req.body;
      const result = getAllTasksByBoardId(boardId);
      if (result === false) {
        throw new ErrorHandler(NOT_FOUND, 'Not Found');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .post(middleware(taskUpdateSchema), async (req, res, next) => {
    try {
      const { title, order, description, userId, boardId, columnId } = req.body;

      const result = addNewTask({
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
