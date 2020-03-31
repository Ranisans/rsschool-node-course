const uuid = require('uuid');

class Column {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = '',
    userId,
    columnId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
  }
}

module.exports = Column;
