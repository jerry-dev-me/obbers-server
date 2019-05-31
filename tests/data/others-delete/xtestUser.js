// const q = require("../../../../app/queries");
// const fakeFields = require("../../fakeFields");
//
// const testUser = async (numOfUsersToCreate) => {
//   if (numOfUsersToCreate > 1) {
//     let arrayOfFields = [];
//     for (let i = 0; i < numOfUsersToCreate; i++) {
//       let fields = await fakeFields.user();
//       arrayOfFields.push(fields);
//     };
//     return await create(numOfUsersToCreate, arrayOfFields);
//   } else {
//     return await create(numOfUsersToCreate, fakeFields.user());
//   }
// }
//
// const invalidTestUser = async (numOfUsersToCreate) => {
//   if (numOfUsersToCreate > 1) {
//     let arrayOfFields = [];
//     for (let i = 0; i < numOfUsersToCreate; i++) {
//       let fields = await fakeFields.invalidUser();
//       arrayOfFields.push(fields);
//     };
//     return await create(numOfUsersToCreate, arrayOfFields);
//   } else {
//     return await create(numOfUsersToCreate, fakeFields.invalidUser());
//   }
// }
//
// const customTestUser = async (numOfUsersToCreate, customFields) => {
//   if (numOfUsersToCreate > 1) {
//     let arrayOfFields = [];
//     for (let i = 0; i < numOfUsersToCreate; i++) {
//       let fields = await fakeFields.user(customFields[i]);
//       arrayOfFields.push(fields);
//     };
//     return await create(numOfUsersToCreate, arrayOfFields);
//   } else {
//     return await create(numOfUsersToCreate, fakeFields.user(customFields));
//   }
// }
//
// const create = async (numOfUsersToCreate, fields) => {
//   if (numOfUsersToCreate === null
//     || numOfUsersToCreate === undefined
//     || numOfUsersToCreate === 1) {
//     const newUser = await q.features.user.create.new(fields);
//     return newUser;
//   } else if (numOfUsersToCreate > 1) {
//     let users = [];
//     for (let i = 0; i < numOfUsersToCreate; i++) {
//       const newUser = await q.features.user.create.new(fields[i]);
//       users.push(newUser);
//     }
//     return users;
//   }
// }
//
// // const testUserWithPosts = async (numOfPostsToCreate) => {
// //   // return { newUserId, postsArrayOfObjects }
// // }
//
// // const multipleUsersWithPosts = async (numOfUsersToCreate, postsPerUser) => {
// //   // return { usersArrayOfObjects }
// // }
//
// module.exports = {
//   testUser,
//   invalidTestUser,
//   customTestUser
// }
