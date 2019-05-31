// const q = require("../../../../app/queries");
// const fakeFields = require("../../fakeFields");
//
// const testPost = async (numOfPostsToCreate, writerId) => {
//   return await create(
//     numOfPostsToCreate,
//     writerId,
//     fakeFields.post({ userId: writerId })
//   );
// };
//
// const invalidTestPost = async (numOfPostsToCreate, writerId) => {
//   return await create(
//     numOfPostsToCreate,
//     writerId,
//     fakeFields.invalidPost({ userId: writerId })
//   );
// };
//
// const customTestPost = async (numOfPostsToCreate, writerId, customFields) => {
//   return await create(
//     numOfPostsToCreate,
//     writerId,
//     fakeFields.post(customFields) // add a new { userId:writerId } object and merge this with the customFields object
//   );
// };
//
// const create = async (numOfPostsToCreate, writerId, fields) => {
//   if (numOfPostsToCreate === null ||
//     numOfPostsToCreate === undefined ||
//     numOfPostsToCreate === 1) {
//     const newPost = await q.features.post.create.new(
//       writerId,
//       fields
//     );
//     return newPost;
//   } else if (numOfPostsToCreate > 1) {
//     let posts = [];
//     for (let i = 0; i < numOfPostsToCreate; i++) {
//       const newPost = await q.features.post.create.new(
//         writerId,
//         fields
//       );
//       posts.push(newPost);
//     }
//     return posts;
//   }
// };
//
// module.exports = {
//   testPost,
//   invalidTestPost,
//   customTestPost
// };
