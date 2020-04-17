const {
  getBoardById,
  getAllBoards,
  addNewBoard,
  updateBoardById,
  deleteBoardById
} = require('./repository');

exports.getAllBoard = async () => {
  return await getAllBoards();
};

exports.getBoardById = async id => {
  const result = await getBoardById(id);
  if (result === undefined) {
    return false;
  }
  return result;
};

exports.addNewBoard = async ({ title, columns }) => {
  return await addNewBoard({ title, columns });
};

exports.updateBoardById = async ({ id, title, columns }) => {
  const transformedColumns = columns.map(column => ({
    _id: column.id,
    title: column.title,
    order: column.order
  }));
  const result = await updateBoardById({
    id,
    title,
    columns: transformedColumns
  });
  if (result.n === 1) {
    return await getBoardById(id);
  }
  return false;
};

exports.deleteBoardById = async id => {
  return await deleteBoardById(id);
};
