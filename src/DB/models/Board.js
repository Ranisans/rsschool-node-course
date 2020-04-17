const mongoose = require('mongoose');
const uuid = require('uuid');

const transformColumnFromDBToClientView = column => ({
  id: column._id,
  title: column.title,
  order: column.order
});

const boardSchema = mongoose.Schema(
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

boardSchema.static('toResponse', board => {
  const { _id, title, columns } = board;
  const columnsData = columns.map(column =>
    transformColumnFromDBToClientView(column)
  );
  return { id: _id, title, columns: columnsData };
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
