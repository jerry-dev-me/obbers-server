module.exports.byObjProp = (a, b, prop) => {
  // EXAMPLE:

  // var a = [{
  //   'id': '1',
  //   'name': 'a1'
  // }, {
  //   'id': '2',
  //   'name': 'a2'
  // }, {
  //   'id': '3',
  //   'name': 'a3'
  // }]
  // var b = [{
  //   'id': '2',
  //   'name': 'a2'
  // }]
  //
  // var c = a.filter(function(objFromA) {
  //   return !b.find(function(objFromB) {
  //     return objFromA.id === objFromB.id
  //   })
  // })
  // console.log(c)
  
  return a.filter(function(objFromA) {
    return !b.find(function(objFromB) {
      return objFromA[prop].toString() === objFromB[prop].toString();
    });
  });
};

module.exports.byExactObjPropAndValue = (a, b, prop, val) => {
  return a.filter(function(objFromA) {
    return !b.find(function(objFromB) {
      return objFromA[prop].toString() === objFromB[prop].toString()
      && objFromA[prop] === val.toString()
      && objFromB[prop] === val.toString();
    });
  });
};
