const uuid = require('uuid');

const { tasks } = require('../../DB/tables');
const getSingleElementById = require('../logic');

exports.getAllTasksByBoardId = id => {
  return tasks.filter(task => task.boardId === id);
};

exports.getTaskById = id => {
  return tasks.filter(task => task.id === id)[0];
};

exports.addNewTask = ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => {
  const newTask = {
    id: uuid(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };
  tasks.push(newTask);
  return newTask;
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
  const [task, position] = getSingleElementById(tasks, id);

  if (task === undefined) {
    return false;
  }

  const newTask = {
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };

  tasks[position] = newTask;
  return newTask;
};

exports.deleteTaskById = id => {
  const [task, position] = getSingleElementById(tasks, id);

  if (task === undefined) {
    return false;
  }

  tasks.splice(position, 1);
  return true;
};
