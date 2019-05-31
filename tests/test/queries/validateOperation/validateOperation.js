// const q = require("../../../../app/queries");
//
// const validation = async () => {
//   return await q.validateOperation({
//     info: {
//       userId: testData.testUser.id,
//       operation: "create",
//       model: "response",
//       adminOnly: true
//     },
//     references: [
//       {
//         refType: "documentFields",
//         value: {
//           userId: testUserId,
//           commentId: comment1Id,
//           content: "test response by admin user"
//         }
//       },
//       {
//         refType: "refObject",
//         value: {
//           model: "response",
//           id: testData.testUser.response2.id
//         },
//         restriction: { type: "default", allRefs: false }
//       }
//     ]
//   });
// };
//
// module.exports.create = {
//   withRefType: {
//     documentFields: (async function() {
//
//     })(),
//     documentFieldsAndDocument: (async function() {
//
//     })(),
//     documentFieldsAndRefObject: (async function() {
//
//     })(),
//     documentFieldsAndRefObjectsArr: (async function() {
//
//     })(),
//   }
// };
