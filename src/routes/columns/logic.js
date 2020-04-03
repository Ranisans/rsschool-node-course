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

exports.deleteColumnById = id => {
  let position;
  const board = columns.filter((singleColumns, index) => {
    if (singleColumns.id === id) {
      position = index;
      return true;
    }
    return false;
  })[0];

  if (board === undefined) {
    return false;
  }

  columns.splice(position, 1);
  return true;
};
