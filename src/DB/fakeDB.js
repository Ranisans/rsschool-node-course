const fs = require('fs').promises;

const { users, boards, tasks } = require('./tables');
const { logHandler } = require('../handlers');

const readData = async (filename, table) => {
  return fs
    .readFile(filename)
    .then(data => JSON.parse(data))
    .then(result => {
      result.forEach(userData => {
        table.push(userData);
      });
    })
    .catch(error => {
      logHandler({ error });
    });
};

const generateDB = async () => {
  await readData('./src/DB/data/Users.json', users);
  await readData('./src/DB/data/Boards.json', boards);
  await readData('./src/DB/data/Tasks.json', tasks);
};

module.exports = generateDB;
