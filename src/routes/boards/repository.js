const { Board } = require('../../DB/models');

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
  return Board.deleteOne({ _id: id });
  // TODO add deletion board's tasks
};
