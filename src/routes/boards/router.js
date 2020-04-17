const router = require('express').Router();
const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');

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

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const board = await getBoardById(id);
      if (!board) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
        );
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
      const result = await updateBoardById({ id, title, columns });
      if (!result) {
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
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteBoardById(id);
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
      res.json(await getAllBoard());
    } catch (error) {
      next(error);
    }
  })
  .post(middleware(boardSchema), async (req, res, next) => {
    try {
      const { title, columns } = req.body;
      const result = await addNewBoard({ title, columns });
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
