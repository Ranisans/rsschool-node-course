const { Task } = require('../../DB/models');

exports.getAllTasksByBoardId = async id => {
  const tasks = await Task.find({ boardId: id });
  if (tasks) {
    return tasks.map(task => Task.toResponse(task));
  }
  return undefined;
};

exports.getTaskById = async ({ boardId, taskId }) => {
  const task = await Task.findOne({ _id: taskId, boardId }).exec();
  if (task) {
    return Task.toResponse(task);
  }
  return undefined;
};

exports.addNewTask = async data => {
  const task = await Task.create(data);
  return Task.toResponse(task);
};

exports.updateTaskById = async data => {
  return Task.updateOne({ _id: data.id }, { $set: data });
};

exports.deleteTaskById = async id => {
  return Task.deleteOne({ _id: id });
};
