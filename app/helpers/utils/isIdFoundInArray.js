module.exports = (id, array) => {
  // array.includes(id); // returns true or false
  let isFound
  array.map(element => {
    if (element.toString() === id.toString()) {
      isFound = true
    }
  })
  if (isFound !== true) isFound = false
  return isFound
}
