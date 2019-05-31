module.exports = (arrayOfObjects, propertyName) => {
  const sortedArray = arrayOfObjects.sort(function(a, b) {
    return a[propertyName] > b[propertyName]
      ? 1
      : b[propertyName] > a[propertyName]
        ? -1
        : 0;
  });
  return sortedArray;
};
