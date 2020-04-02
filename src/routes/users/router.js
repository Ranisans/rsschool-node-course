const router = require('express').Router();

const {
  getAllUser,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById
} = require('./logic');
const { OK, ERROR, SERVER_ERROR } = require('../../statusCodes');

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    res.json(getUserById(id));
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const result = deleteUserById(id);
    res.sendStatus(result ? OK : ERROR);
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
    res.sendStatus(result ? OK : SERVER_ERROR);
  })
  .put(async (req, res) => {
    const { id, name, login, password } = req.body;
    if (id === undefined) {
      res.sendStatus(ERROR);
      return;
    }
    const result = updateUserById({ id, name, login, password });
    res.sendStatus(result ? OK : SERVER_ERROR);
  });

module.exports = router;
