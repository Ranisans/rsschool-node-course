const router = require('express').Router();

const {
  getAllUser,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById
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
    const user = getUserById(id);
    if (user === undefined) {
      res.sendStatus(NOT_FOUND);
      return;
    }
    res.json(user);
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    if (name === undefined && login === undefined && password === undefined) {
      res.sendStatus(ERROR);
      return;
    }
    const result = updateUserById({ id, name, login, password });
    if (!result) {
      res.sendStatus(SERVER_ERROR);
      return;
    }
    res.json(result);
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const result = deleteUserById(id);
    res.sendStatus(result ? OK_NO_CONTENT : NOT_FOUND);
  });

router
  .route('/')
  .get(async (req, res) => {
    res.json(getAllUser());
  })
  .post(async (req, res) => {
    const { name, login, password } = req.body;
    if (name === undefined || login === undefined || password === undefined) {
      res.sendStatus(ERROR);
      return;
    }
    const result = addNewUser({ name, login, password });
    if (!result) {
      res.sendStatus(SERVER_ERROR);
      return;
    }
    res.json(result);
  });

module.exports = router;
