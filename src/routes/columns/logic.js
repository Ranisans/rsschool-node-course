const uuid = require('uuid');

exports.addNewColumn = ({ title, order }) => {
  const newColumn = {};
  newColumn.id = uuid();
  newColumn.title = title;
  newColumn.order = order;
  return newColumn;
};
