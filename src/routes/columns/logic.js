const uuid = require('uuid');

const { columns } = require('../../DB/tables');

exports.getColumnById = id => {
  return columns.filter(column => column.id === id)[0];
};

exports.addNewColumn = ({ title, order }) => {
  if (title === undefined || order === undefined) {
    return false;
  }
  const newColumn = {};
  newColumn.id = uuid();
  newColumn.title = title;
  newColumn.order = order;
  columns.push(newColumn);
  return newColumn;
};
