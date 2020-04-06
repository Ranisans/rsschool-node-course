const {
  getBoardById,
  getAllBoards,
  addNewBoard,
  updateBoardById,
  deleteBoardById
} = require('./repository');

exports.getAllBoard = () => {
  return getAllBoards();
};

exports.getBoardById = id => {
  const result = getBoardById(id);
  if (result === undefined) {
    return false;
  }
  return result;
};

exports.addNewBoard = ({ title, columns }) => {
  return addNewBoard({ title, columns });
};

exports.updateBoardById = ({ id, title, columns }) => {
  return updateBoardById({ id, title, columns });
};

exports.deleteBoardById = id => {
  return deleteBoardById(id);
};
