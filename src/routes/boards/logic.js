const uuid = require('uuid');

const { boards } = require('../../DB/tables');
const {
  getColumnById,
  addNewColumn,
  deleteColumnById
} = require('../columns/logic');

const addColumnsToBoard = columns => {
  return columns.map(columnId => {
    const column = getColumnById(columnId);
    return column ? column : null;
  });
};

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
  const result = [];
  boards.forEach(singleBoard => {
    const board = {};
    board.id = singleBoard.id;
    board.title = singleBoard.title;
    board.columns = addColumnsToBoard(singleBoard.columns);
    result.push(board);
  });
  return result;
};

exports.getBoardById = id => {
  const board = boards.filter(singleBoard => singleBoard.id === id)[0];
  if (board === undefined) {
    return false;
  }
  const boardRecord = JSON.parse(JSON.stringify(board));
  boardRecord.columns = addColumnsToBoard(boardRecord.columns);
  return boardRecord;
};

exports.addNewBoard = ({ title, columns }) => {
  const id = uuid();
  const newBoard = { id, title };
  const resultBoard = { id, title };
  newBoard.columns = [];
  resultBoard.columns = [];
  if (columns !== undefined) {
    const newColumns = createColumns(columns);
    if (!newColumns) {
      return false;
    }
    newColumns.forEach(column => {
      newBoard.columns.push(column.id);
    });
    resultBoard.columns = newColumns;
  }
  boards.push(newBoard);
  return resultBoard;
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
    return false;
  }

  const newBoard = {};
  const resultBoard = {};
  newBoard.id = id;
  resultBoard.id = id;
  newBoard.title = title ? title : board.title;
  resultBoard.title = newBoard.title;

  if (columns !== undefined) {
    // * try create all column
    // ? But what if there is not enough data not in the first column?
    const newColumns = createColumns(columns);
    if (!newColumns) {
      return false;
    }
    // * delete created before columns
    board.columns.forEach(columnId => {
      deleteColumnById(columnId);
    });
    resultBoard.columns = newColumns;
    newBoard.columns = [];
    newColumns.forEach(column => {
      newBoard.columns.push(column.id);
    });
  } else {
    newBoard.columns = board.columns;
  }

  boards[position] = newBoard;

  return resultBoard;
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

  // * delete all columns on this board
  board.columns.forEach(columnId => {
    deleteColumnById(columnId);
  });

  boards.splice(position, 1);
  return true;
};
