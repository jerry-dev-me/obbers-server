// const q = require("../../../../app/queries");
// const fakeFields = require("../../fakeFields");
//
// const testCollection = async (numOfCollectionsToCreate, writerId) => {
//   return await create(
//     numOfCollectionsToCreate,
//     writerId,
//     fakeFields.collection({ userId: writerId })
//   );
// };
//
// const invalidTestCollection = async (numOfCollectionsToCreate, writerId) => {
//   return await create(
//     numOfCollectionsToCreate,
//     writerId,
//     fakeFields.invalidCollection()
//   );
// };
//
// const customTestCollection = async (numOfCollectionsToCreate, writerId, customFields) => {
//   let userIdObject = { userId: writerId };
//   return await create(
//     numOfCollectionsToCreate,
//     writerId,
//     // fakeFields.collection(customFields)
//     fakeFields.collection({...userIdObject, ...customFields})
//   );
// };
//
// const create = async (numOfCollectionsToCreate, writerId, fields) => {
//   if (numOfCollectionsToCreate === null ||
//     numOfCollectionsToCreate === undefined ||
//     numOfCollectionsToCreate === 1) {
//     const newCollection = await q.features.collection.create.new(
//       writerId,
//       fields
//     );
//     return newCollection;
//   } else if (numOfCollectionsToCreate > 1) {
//     let posts = [];
//     for (let i = 0; i < numOfCollectionsToCreate; i++) {
//       const newCollection = await q.features.collection.create.new(
//         writerId,
//         fields
//       );
//       posts.push(newCollection);
//     }
//     return posts;
//   }
// };
//
// module.exports = {
//   testCollection,
//   invalidTestCollection,
//   customTestCollection
// };
