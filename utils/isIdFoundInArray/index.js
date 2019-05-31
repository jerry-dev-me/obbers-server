module.exports = (id, array) => {
  // array.includes(id); // returns true or false
  let found;
  array.map(element => {
    if (element.toString() === id.toString()) {
      found = true;
    }
  });
  if (found !== true) found = false;
  return found;
};
