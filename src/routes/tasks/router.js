const router = require('express').Router();
const Joi = require('@hapi/joi');

const middleware = require('../joiMiddleware');

const {
  addNewTask,
  deleteTaskById,
  getAllTasksByBoardId,
  getTaskById,
  updateTaskById
} = require('./logic');
const { OK_NO_CONTENT, SERVER_ERROR, NOT_FOUND } = require('../../statusCodes');

const taskUpdateSchema = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().allow(null),
  userId: Joi.string().allow(null),
  columnId: Joi.string().allow(null)
});

router
  .route('/:taskId')
  .get(async (req, res) => {
    const { taskId } = req.params;
    console.log('taskId', taskId);
    const task = getTaskById(taskId);
    if (!task) {
      res.sendStatus(NOT_FOUND);
      return;
    }
    res.json(task);
  })
  .put(middleware(taskUpdateSchema), async (req, res) => {
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
      res.sendStatus(SERVER_ERROR);
      return;
    }
    res.json(result);
  })
  .delete(async (req, res) => {
    const { taskId } = req.params;
    const result = deleteTaskById(taskId);
    res.sendStatus(result ? OK_NO_CONTENT : NOT_FOUND);
  });

router
  .route('/')
  .get(async (req, res) => {
    const { boardId } = req.body;
    const result = getAllTasksByBoardId(boardId);
    if (result === false) {
      res.sendStatus(NOT_FOUND);
      return;
    }
    res.json(result);
  })
  .post(middleware(taskUpdateSchema), async (req, res) => {
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
  });

module.exports = router;
