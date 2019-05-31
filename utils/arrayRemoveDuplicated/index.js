const objects = arr => {
  const areObjectsEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  let newArray = [];
  arr.map(arrObj => {
    if (newArray.length === 0) {
      newArray.push(arrObj);
    } else {
      let foundObject = false;
      newArray.map(newArrayObj => {
        const objectsEqual = areObjectsEqual(newArrayObj, arrObj);
        if (objectsEqual === true) foundObject = true;
      })
      if (foundObject === false) newArray.push(arrObj);
    }
  })
  return newArray;
};

const values = arr => {
};

module.exports = {
  objects,
  values
}
