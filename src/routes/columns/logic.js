const { columns } = require('../../DB/tables');

exports.getColumnById = id => {
  return columns.filter(column => column.id === id)[0];
};
