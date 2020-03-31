const { PORT } = require('./common/config');
const app = require('./app');
const generateDB = require('./DB/fakeDB');

generateDB();

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
