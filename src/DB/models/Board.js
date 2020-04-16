const mongoose = require('mongoose');
const uuid = require('uuid');

const boardScheme = mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number,
        _id: {
          type: String,
          default: uuid
        }
      }
    ],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const Board = mongoose.model('Board', boardScheme);

module.exports = Board;
