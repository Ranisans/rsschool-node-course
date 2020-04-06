const {
  addNewTask,
  deleteTaskById,
  getAllTasksByBoardId,
  getTaskById,
  updateTaskById
} = require('./repository');

exports.getAllTasksByBoardId = id => {
  return getAllTasksByBoardId(id);
};

exports.getTaskById = id => {
  return getTaskById(id);
};

exports.addNewTask = ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => {
  return addNewTask({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
};

exports.updateTaskById = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => {
  return updateTaskById({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
};

exports.deleteTaskById = id => {
  return deleteTaskById(id);
};
