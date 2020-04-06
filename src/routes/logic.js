const getSingleElementById = (dataArray, id) => {
  let position;
  const element = dataArray.filter((singleElement, index) => {
    if (singleElement.id === id) {
      position = index;
      return true;
    }
    return false;
  })[0];

  return [element, position];
};

module.exports = getSingleElementById;
