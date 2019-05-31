// module.exports.toArray = (o) => {
//  const socialConnections = await create.userSocialConnections(testUserId);
//  let socialConnectionsUserIds = Object.keys(socialConnections).map(key => {
//    return socialConnections[key].id;
//  });
// }
//
// module.exports.toArrayOfKeys = (o) => {
//
// }
//
// module.exports.toArrayOfValues = (o) => {
//
// }
//
// module.exports.toArrayOfValuesFromNestedObject = (o) => {
//
// }
//
// const o = {
//   key1: "val1",
//   key2: "val2"
// };
//
// const key1 = Object.keys(o)[0];
// const val1 = o[key1];
//
// const key2 = Object.keys(o)[1];
// const val2 = o[key2];
//
//
//
////////////////////////////////////////////////////////////////////////////////
//
// const users = {
//   user1: { id: "1" },
//   user2: { id: "2" },
//   user3: { id: "3" }
// }
//
// let userIds = Object.keys(users).map(key => {
//   console.log(key); // user1 user2 user3
//   console.log(users[key]); // { id: "1" } { id: "2" } { id: "3" }
//   console.log(users[key].id); // "1" "2" "3"
//   return users[key].id;
// });
//
// console.log(userIds); // ["1", "2", "3"]
//
////////////////////////////////////////////////////////////////////////////////
//
// Grab object key.value and push that value into a new array:
// // make object { user1: { id }, user2: { id }, user3: { id } }
// // to array [ user1.id, user2.id, user3.id ]
// let socialConnectionsUserIds = Object.keys(socialConnections).map(key => {
//   return socialConnections[key].id;
// });
//
//
// convert object to array
// let socialConnectionsUserIds = Object.keys(socialConnections).map(key => {
//   return socialConnections[key].id;
// });
//
// const socialConnections = await create.userSocialConnections(testUserId);
//
// let socialConnectionsUserIds = Object.keys(socialConnections).map(key => {
//   return socialConnections[key].id;
// });
