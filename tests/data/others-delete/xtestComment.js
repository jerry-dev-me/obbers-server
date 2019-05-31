// const q = require("../../../../app/queries");
// const fakeFields = require("../../fakeFields");
//
// const testComment = async (numOfCommentsToCreate, writerId, postId) => {
//   return await create(
//     numOfCommentsToCreate,
//     writerId,
//     postId,
//     fakeFields.comment({ userId: writerId })
//   );
// };
//
// const invalidTestComment = async (numOfCommentsToCreate, writerId, postId) => {
//   return await create(
//     numOfCommentsToCreate,
//     writerId,
//     postId,
//     fakeFields.invalidComment()
//   );
// };
//
// const customTestComment = async (numOfCommentsToCreate, writerId, postId, customFields) => {
//   return await create(
//     numOfCommentsToCreate,
//     writerId,
//     postId,
//     fakeFields.comment(customFields)
//   );
// };
//
// const create = async (numOfCommentsToCreate, writerId, postId, fields) => {
//   if (numOfCommentsToCreate === null ||
//     numOfCommentsToCreate === undefined ||
//     numOfCommentsToCreate === 1) {
//     const newComment = await q.features.comment.create.new(
//       writerId,
//       postId,
//       fields
//     );
//     return newComment;
//   } else if (numOfCommentsToCreate > 1) {
//     let comments = [];
//     for (let i = 0; i < numOfCommentsToCreate; i++) {
//       const newComment = await q.features.comment.create.new(
//         writerId,
//         postId,
//         fields
//       );
//       comments.push(newComment);
//     }
//     return comments;
//   }
// };
//
// module.exports = {
//   testComment,
//   invalidTestComment,
//   customTestComment
// };
