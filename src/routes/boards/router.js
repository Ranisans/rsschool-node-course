const router = require('express').Router();
const Joi = require('@hapi/joi');

const middleware = require('../joiMiddleware');

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
const {
  OK_NO_CONTENT,
  ERROR,
  SERVER_ERROR,
  NOT_FOUND
} = require('../../statusCodes');

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const board = getBoardById(id);
    if (!board) {
      res.sendStatus(NOT_FOUND);
      return;
    }
    res.json(board);
  })
  .put(middleware(boardSchema), async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const result = updateBoardById({ id, title, columns });
    if (!result) {
      res.sendStatus(SERVER_ERROR);
      return;
    }
    res.json(result);
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const result = deleteBoardById(id);
    res.sendStatus(result ? OK_NO_CONTENT : NOT_FOUND);
  });

router
  .route('/')
  .get(async (req, res) => {
    res.json(getAllBoard());
  })
  .post(middleware(boardSchema), async (req, res) => {
    const { title, columns } = req.body;
    if (title === undefined) {
      res.sendStatus(ERROR);
      return;
    }
    const result = addNewBoard({ title, columns });
    if (!result) {
      res.sendStatus(ERROR);
      return;
    }
    res.json(result);
  });

module.exports = router;
