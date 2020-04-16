const mongoose = require('mongoose');
const fs = require('fs').promises;

const { MONGO_CONNECTION_STRING } = require('../common/config');
const { User, Board, Task } = require('./models');
const { logHandler } = require('../handlers');

const readData = async (filename, Table) => {
  return fs
    .readFile(filename)
    .then(data => JSON.parse(data))
    .then(result => {
      const data = result.map(element => new Table(element));
      data.forEach(element => element.save());
    })
    .catch(error => {
      logHandler({ error });
    });
};

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log('DB connected');
    await db.dropDatabase();
    console.log('DB has been erased');
    await readData('./src/DB/data/Users.json', User);
    await readData('./src/DB/data/Boards.json', Board);
    await readData('./src/DB/data/Tasks.json', Task);
    console.log('DB data has been written');
    cb();
  });
};

module.exports = connectToDB;
