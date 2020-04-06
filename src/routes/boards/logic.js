const uuid = require('uuid');

const { boards } = require('../../DB/tables');
const { addNewColumn } = require('../columns/logic');
const getSingleElementById = require('../logic');

const createColumns = columns => {
  const result = [];
  for (let i = 0; i < columns.length; i += 1) {
    const column = addNewColumn(columns[i]);
    if (column === false) {
      return false;
    }
    result.push(column);
  }
  return result;
};

exports.getAllBoard = () => {
  return boards;
};

exports.getBoardById = id => {
  const board = boards.filter(singleBoard => singleBoard.id === id)[0];
  if (board === undefined) {
    return false;
  }
  return board;
};

exports.addNewBoard = ({ title, columns }) => {
  const id = uuid();
  const newBoard = { id, title };
  const newColumns = createColumns(columns);
  if (newColumns === false) {
    return false;
  }
  newBoard.columns = newColumns;
  boards.push(newBoard);
  return newBoard;
};

exports.updateBoardById = ({ id, title, columns }) => {
  const [board, position] = getSingleElementById(boards, id);
  console.log('exports.updateBoardById -> board', board);

  if (board === undefined) {
    return false;
  }

  const newBoard = {};
  newBoard.id = id;
  newBoard.title = title ? title : board.title;

  const columnsWithId = [];
  const columnsWithoutId = [];

  columns.forEach(column => {
    if (column.id === undefined) {
      columnsWithoutId.push(column);
    } else {
      columnsWithId.push(column);
    }
  });

  newBoard.columns = columnsWithId.concat(createColumns(columnsWithoutId));

  boards[position] = newBoard;

  return newBoard;
};

exports.deleteBoardById = id => {
  // TODO delete all task with this board-id

  const [board, position] = getSingleElementById(boards, id);

  if (board === undefined) {
    return false;
  }

  boards.splice(position, 1);
  return true;
};
