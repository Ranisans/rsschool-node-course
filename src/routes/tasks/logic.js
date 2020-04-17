const {
  addNewTask,
  deleteTaskById,
  getAllTasksByBoardId,
  getTaskById,
  updateTaskById
} = require('./repository');

exports.getAllTasksByBoardId = async id => {
  return await getAllTasksByBoardId(id);
};

exports.getTaskById = async data => {
  return await getTaskById(data);
};

exports.addNewTask = async data => {
  return await addNewTask(data);
};

exports.updateTaskById = async data => {
  const result = await updateTaskById(data);
  if (result.n) {
    return await getTaskById({ boardId: data.boardId, taskId: data.id });
  }
  return false;
};

exports.deleteTaskById = async data => {
  return await deleteTaskById(data);
};
