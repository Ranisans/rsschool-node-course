const { Board } = require('../../DB/models');
const { deleteTaskByBoardId } = require('../tasks/repository');

exports.getBoardById = async id => {
  const board = await Board.findOne({ _id: id }).exec();
  if (board) {
    return Board.toResponse(board);
  }
  return undefined;
};

exports.getAllBoards = async () => {
  const boards = await Board.find({});
  return boards.map(board => Board.toResponse(board));
};

exports.addNewBoard = async ({ title, columns }) => {
  const board = await Board.create({ title, columns });
  return Board.toResponse(board);
};

exports.updateBoardById = async ({ id, title, columns }) => {
  return Board.updateOne({ _id: id }, { $set: { title, columns } });
};

exports.deleteBoardById = async id => {
  const result = await Board.deleteOne({ _id: id });
  if (result.n) {
    await deleteTaskByBoardId(id);
    return true;
  }
  return false;
};
