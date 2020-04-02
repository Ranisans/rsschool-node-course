const uuid = require('uuid');

const { boards } = require('../../DB/tables');

exports.getAllBoard = () => {
  return boards;
};

exports.getBoardById = id => {
  return boards.filter(board => board.id === id);
};

exports.addNewBoard = ({ title }) => {
  const id = uuid();
  boards.push({ id, title, columns: [] });
  return true;
};

exports.updateBoardById = ({ id, title, columns }) => {
  let position;
  const board = boards.filter((singleBoard, index) => {
    if (singleBoard.id === id) {
      position = index;
      return true;
    }
    return false;
  })[0];

  if (board === undefined) {
    return true;
  }

  const newBoard = {};
  newBoard.id = id;
  newBoard.title = title ? title : board.title;
  newBoard.columns = columns ? columns : board.columns;

  boards[position] = newBoard;

  return true;
};

exports.deleteBoardById = id => {
  // TODO delete all task with this board-id
  let position;
  const board = boards.filter((singleBoard, index) => {
    if (singleBoard.id === id) {
      position = index;
      return true;
    }
    return false;
  })[0];

  if (board === undefined) {
    return false;
  }

  boards.splice(position, 1);
  return true;
};
