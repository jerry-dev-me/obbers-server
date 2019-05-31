// const q = require("../../../../app/queries");
// const fakeFields = require("../../fakeFields");
//
// const testResponse = async (numOfResponsesToCreate, writerId, commentId) => {
//   return await create(
//     numOfResponsesToCreate,
//     writerId,
//     commentId,
//     fakeFields.response({ userId: writerId })
//   );
// };
//
// const invalidTestResponse = async (numOfResponsesToCreate, writerId, commentId) => {
//   return await create(
//     numOfResponsesToCreate,
//     writerId,
//     commentId,
//     fakeFields.invalidResponse()
//   );
// };
//
// const customTestResponse = async (numOfResponsesToCreate, writerId, commentId, customFields) => {
//   return await create(
//     numOfResponsesToCreate,
//     writerId,
//     commentId,
//     fakeFields.response(customFields)
//   );
// };
//
// const create = async (numOfResponsesToCreate, writerId, commentId, fields) => {
//   if (numOfResponsesToCreate === null ||
//     numOfResponsesToCreate === undefined ||
//     numOfResponsesToCreate === 1) {
//     const newResponse = await q.features.response.create.new(
//       writerId,
//       commentId,
//       fields
//     );
//     return newResponse;
//   } else if (numOfResponsesToCreate > 1) {
//     let responses = [];
//     for (let i = 0; i < numOfResponsesToCreate; i++) {
//       const newResponse = await q.features.response.create.new(
//         writerId,
//         commentId,
//         fields
//       );
//       responses.push(newResponse);
//     }
//     return responses;
//   }
// };
//
// module.exports = {
//   testResponse,
//   invalidTestResponse,
//   customTestResponse
// };
