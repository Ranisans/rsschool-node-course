const router = require('express').Router();

const {
  addNewBoard,
  deleteBoardById,
  getAllBoard,
  getBoardById,
  updateBoardById
} = require('./logic');
const { OK, ERROR, SERVER_ERROR, NOT_FOUND } = require('../../statusCodes');

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
  .put(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const result = updateBoardById({ id, title, columns });
    res.sendStatus(result ? OK : SERVER_ERROR);
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const result = deleteBoardById(id);
    res.sendStatus(result ? OK : ERROR);
  });

router
  .route('/')
  .get(async (req, res) => {
    res.json(getAllBoard());
  })
  .post(async (req, res) => {
    const { title } = req.body;
    if (title === undefined) {
      res.sendStatus(ERROR);
      return;
    }
    const result = addNewBoard({ title });
    res.sendStatus(result ? OK : SERVER_ERROR);
  });

module.exports = router;
