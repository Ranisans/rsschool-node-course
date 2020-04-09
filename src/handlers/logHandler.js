const { createLogger, format, transports } = require('winston');

const errorStackFormat = format(info => {
  if (info.message instanceof Error) {
    return Object.assign({}, info, {
      message: info.message.stack
    });
  }
  return info;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    errorStackFormat(),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'warning.log', level: 'warn' }),
    new transports.File({ filename: 'default.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.json()
    })
  );
}

const logHandler = ({ error, warning, message }) => {
  if (error) {
    logger.error(error);
  } else if (warning) {
    logger.warn(warning);
  } else {
    logger.info(message);
  }
};

module.exports = logHandler;
