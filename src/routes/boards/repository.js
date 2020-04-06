const uuid = require('uuid');

const getSingleElementById = require('../logic');
const { boards } = require('../../DB/tables');
const { addNewColumn } = require('../columns/logic');
const { getAllTasksByBoardId, deleteTaskById } = require('../tasks/logic');

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

exports.getBoardById = id => {
  return boards.filter(singleBoard => singleBoard.id === id)[0];
};

exports.getAllBoards = () => boards;

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

  if (board === undefined) {
    return false;
  }

  const newBoard = { id, title };

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
  const [board, position] = getSingleElementById(boards, id);

  if (board === undefined) {
    return false;
  }

  const boardsTasksId = getAllTasksByBoardId(board.id).map(task => task.id);

  boardsTasksId.forEach(taskId => deleteTaskById(taskId));

  boards.splice(position, 1);
  return true;
};
