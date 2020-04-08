const logHandler = ({ error, message }) => {
  // TODO add write to file
  const date = new Date();
  const dateTime = `${date.getDate()}:${date.getMonth() +
    1}:${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  if (error) {
    console.error(`${dateTime} - ${error}: ${message}`);
  } else {
    console.log(`${dateTime} - ${message}`);
  }
};

module.exports = logHandler;
