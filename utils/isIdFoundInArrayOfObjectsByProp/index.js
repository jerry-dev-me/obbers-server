module.exports = (arrayOfObjects, propertyName, id) => {
  let isFound;
  arrayOfObjects.map(object => {
    if (object[propertyName].toString() === id.toString()) {
      isFound = true;
    }
  });
  if (isFound !== true) isFound = false;
  return isFound;
};
