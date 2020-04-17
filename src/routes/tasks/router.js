const router = require('express').Router();
const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');

const middleware = require('../joiMiddleware');
const { ErrorHandler } = require('../../handlers');

const {
  addNewTask,
  deleteTaskById,
  getAllTasksByBoardId,
  getTaskById,
  updateTaskById
} = require('./logic');

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
      console.log('taskId', taskId);
      const { boardId } = req.body;
      const task = await getTaskById({ boardId, taskId });
      if (!task) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
        );
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
      const result = await updateTaskById({
        id: taskId,
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      });

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
      const { taskId } = req.params;
      const result = await deleteTaskById(taskId);
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
      const { boardId } = req.body;
      const result = await getAllTasksByBoardId(boardId);
      if (result === false) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
        );
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .post(middleware(taskUpdateSchema), async (req, res, next) => {
    try {
      const { title, order, description, userId, boardId, columnId } = req.body;

      const result = await addNewTask({
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
