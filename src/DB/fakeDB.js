const fs = require('fs').promises;

const { users, boards, tasks } = require('./tables');

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
      console.log('readData -> error', error);
      const exit = process.exit;
      exit(1);
    });
};

const generateDB = async () => {
  await readData('./src/DB/data/Users.json', users);
  await readData('./src/DB/data/Boards.json', boards);
  await readData('./src/DB/data/Tasks.json', tasks);
};

module.exports = generateDB;
