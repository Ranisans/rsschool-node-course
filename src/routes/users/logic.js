const {
  addNewUser,
  deleteUserById,
  getAllUser,
  getUserById,
  updateUserById
} = require('./repository');

exports.getAllUser = async () => {
  return await getAllUser();
};

exports.getUserById = async id => {
  return await getUserById(id);
};

exports.addNewUser = async ({ name, login, password }) => {
  return await addNewUser({ name, login, password });
};

exports.updateUserById = async data => {
  const { columns } = data;
  const transformedColumns = columns.map(column => ({
    _id: column.id,
    title: column.title,
    order: column.order
  }));
  data.columns = transformedColumns;
  const result = await updateUserById(data);
  if (result.n) {
    return await getUserById(data.id);
  }
  return false;
};

exports.deleteUserById = async id => {
  return await deleteUserById(id);
};
