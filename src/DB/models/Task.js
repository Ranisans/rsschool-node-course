const mongoose = require('mongoose');
const uuid = require('uuid');

const taskScheme = mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const Task = mongoose.model('Column', taskScheme);

module.exports = Task;
