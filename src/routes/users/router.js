const router = require('express').Router();

const {
  getAllUser,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById
} = require('./logic');
const { OK, ERROR, SERVER_ERROR } = require('../../statusCodes');

router.get('/', async (req, res) => {
  res.json(getAllUser());
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(getUserById(id));
});

router.post('/', async (req, res) => {
  const { name, login, password } = req.body;
  if (name === undefined || login === undefined || password === undefined) {
    res.sendStatus(ERROR);
    return;
  }
  const result = addNewUser({ name, login, password });
  res.sendStatus(result ? OK : SERVER_ERROR);
});

router.put('/', async (req, res) => {
  const { id, name, login, password } = req.body;
  console.log('id', id);
  if (id === undefined) {
    res.sendStatus(ERROR);
    return;
  }
  const result = updateUserById({ id, name, login, password });
  res.sendStatus(result ? OK : SERVER_ERROR);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = deleteUserById(id);
  res.sendStatus(result ? OK : ERROR);
});

module.exports = router;
