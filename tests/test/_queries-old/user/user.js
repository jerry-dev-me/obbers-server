// const _ = require('lodash');
//
// const assert = require('assert');
//
// const User = require('../../../app/models/user');
//
// const CreateUser = require('../../../app/queries/user/CreateUser');
// const ReadUser = require('../../../app/queries/user/ReadUser');
//
// const CreatePost = require('../../../app/queries/post/CreatePost');
//
// const CreateCollection = require('../../../app/queries/collection/CreateCollection');
// const UpdateCollection = require('../../../app/queries/collection/UpdateCollection');
//
// const userFields = require('../../testHelpers/userFields.js');
// const postFields = require('../../testHelpers/postFields.js');
// const runXAsyncTimes = require('../../testHelpers/utils/runXAsyncTimes.js');
//
// describe('User Model Tests', () => {
//
//     // TEST USERS
//     let testUser;
//
//     // BEFORE EACH CALL CREATE A TEST USER
//     beforeEach((done) => {
//
//         // ADD DEFAULT SETTINGS. MODELS CREATED BY SERVER MANAGER.
//         // CREATE ACCOUNT DIFFERENT TYPES OF STATUS AVAILABLE
//         // CREATE ACCOUNT DIFFERENT TYPES OF REPORTS AVAILABLE
//         // CREATE ACCOUNT DIFFERENT TYPES OF PERMITS AVAILABLE
//         // CREATE ACCOUNT DIFFERENT TYPES OF THEMES AVAILABLE
//         // CREATE ACCOUNT DIFFERENT TYPES OF LANGUAGES AVAILABLE
//
//         // TEST USER
//         CreateUser.new(userFields.fillTestUser(), newUser => {
//             console.log('Created test user is: ' + newUser.info);
//             console.log('Test User ID: ' + newUser._id);
//             testUser = newUser;
//             done();
//         });
//
//     });
//
// // =============================================================================
// // CREATE TESTS AND VALIDATION FIELD TESTS
// // =============================================================================
//
//     it('Create a new user with invalid fields - User Model Test', (done) => {
//         CreateUser.new(userFields.fillInvalidUser(), newUser => { return });
//         done();
//     });
//
// // =============================================================================
// // READ
// // =============================================================================
//
//     it('Create a New Collection', (done) => {
//         const fields = { name: 'My New Collection 1'};
//         CreateCollection.new(testUser._id, fields, createdCollection => {
//             console.log('New created collection is:');
//             console.log(createdCollection);
//         });
//         done();
//     });
//
//     // CREATE 3 NEW USERS... EACH USER HAS 3 POSTS...
//     // TEST USER CREATES 3 COLLECTIONS...
//     // EACH COLLECTION HAS 3 POSTS...
//     // EACH POST BELONGS TO A DIFFERENT USER...
//
//     it('Test User reads all his 3 collections', async (done) => {
//       timeout(100000);
//
//
//       try {
//
//           let users = {};
//           let userPosts = [];
//
//           const createUsersAndPosts = async () => {
//
//               for(let i = 0; i < 3; i++) {
//
//                   const newUser = await CreateUser.new(userFields.fillTestUser(), done);
//                   console.log('\n newUser is:\n' + newUser);
//                   for(let i = 0; i < 3; i++) {
//
//                       const fields = postFields.fillTestPost({ userId: newUser._id });
//                       const newPost = await CreatePost.new(fields, newUser._id, done);
//                       console.log('\n newPost is:\n' + newPost);
//                       userPosts.push(newPost._id);
//
//                       const newKey = newUser._id;
//                       const newValue = userPosts;
//                       users[newKey] = newValue;
//
//                       done()
//                   };
//               };
//           };
//
//           const createUserCollections = async () => {
//
//               console.log('\n userPosts are:\n' + userPosts);
//
//               for(let i = 0; i < 3; i++) {
//                   const fields = { name: `New Collection${executedTimes}`};
//                   const newCollection = await CreateCollection.new(testUser._id, fields, done);
//                   console.log('\n newCollection is:\n' + newCollection);
//
//                   done()
//               };
//           };
//
//           const addPostsToUserCollections = async () => {
//
//               let aNum = 0;
//
//               const user = await ReadUser.profileById(testUser._id, testUser._id, done);
//
//               user.collections.map(async collection => {
//
//                   for (key in users) {
//
//                       console.log(`\n Value ${aNum} is: ${users[key][aNum]}`);
//
//                       console.log('\n+++ Collection Id to update is: ' + collection);
//                       console.log(`+++ New PostId to push is: ${users[key][aNum]}`);
//
//                       const updatedCollection = await UpdateCollection.addPost(testUser._id, collection, users[key][aNum], done);
//
//                       done()
//                   };
//                   aNum += 1;
//               });
//           };
//
//           const fields = { collections: 1 };
//           const readUserCollections = await ReadUser.anyFieldsById(testUser._id, testUser._id, fields, done);
//           console.log('\n readUserCollections are:\n' + readUserCollections);
//
//           // const result = await Promise.all([createUsersAndPosts(), createUserCollections(), addPostsToUserCollections(), readUserCollections()]);
//           const result = await Promise.all([createUsersAndPosts()]);
//
//           console.log(await result);
//
//       }
//       catch(rejectedValue) {
//           console.log(rejectedValue);
//       }
//
//
//       //////
//         //
//         //
//         // let funcIndex = -1;
//         // let timesToExecute;
//         // let executedTimes;
//         // let users = {};
//         //
//         // // CREATES 3 NEW USERS AND 3 POSTS PER USER
//         //
//         // const funcA = () => {
//         //     console.log('\n 1 - funcA');
//         //     return CreateUser.new(userFields.fillTestUser(), newUser => {
//         //
//         //         console.log('\n 2 - funcA CreateUser()');
//         //
//         //         let userPosts = [];
//         //
//         //         // let postNum = 1;
//         //         const createPost = () => {
//         //             console.log('\n 3 - funcA createPost()');
//         //
//         //             const fields = postFields.fillTestPost({ userId: newUser._id });
//         //             CreatePost.new(fields, newUser._id, createdPost => {
//         //
//         //                 console.log('\n 4 - funcA createPost() CreatePost.new()');
//         //                 // postNum += 1;
//         //
//         //                 userPosts.push(createdPost._id);
//         //
//         //                 console.log('\n User Id is: ' + newUser._id);
//         //                 console.log('Post Id is: ' + createdPost._id);
//         //             });
//         //         };
//         //         _.times(3, createPost);
//         //
//         //         var newKey = newUser._id;
//         //         var newValue = userPosts;
//         //         users[newKey] = newValue;
//         //         // console.log('\n 5 - funcA users object is: \n');
//         //         // console.log(users);
//         //
//         //         timesToExecute = 3;
//         //         executedTimes += 1;
//         //         xTimes();
//         //     });
//         // };
//         //
//         // // TEST USER CREATES 3 COLLECTIONS
//         //
//         // const funcB = () => {
//         //     console.log('\n funcB');
//         //
//         //     const fields = { name: `New Collection${executedTimes}`};
//         //     return CreateCollection.new(testUser._id, fields, createdCollection => {
//         //         console.log('\n Test User id is: ' + testUser._id);
//         //         console.log('Collection id is: ' + createdCollection._id);
//         //
//         //         timesToExecute = 3;
//         //         executedTimes += 1;
//         //         xTimes();
//         //     });
//         // };
//         //
//         // const funcC = () => {
//         //
//         //     let aNum = 0;
//         //
//         //     return ReadUser.profileById(testUser._id, testUser._id, foundUser => {
//         //
//         //         foundUser.collections.map(collection => {
//         //             console.log('\n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//         //             console.log('\n >>>>> Collection Id is: ' + collection);
//         //
//         //             console.log(aNum);
//         //
//         //             for (key in users) {
//         //
//         //                 console.log('\n - Key in users is: ' + key);
//         //                 // console.log('\n - Value in Key is: ' + users[key]);
//         //                 console.log(' - Value in Key is: ' + users[key]);
//         //                 console.log(typeof users[key]);
//         //
//         //                 users[key].map(value => {
//         //                     console.log('\n each value is: ' + value);
//         //                 })
//         //
//         //                 console.log(`\n <<<<< Value ${aNum} is: ${users[key][aNum]}`);
//         //                 // console.log(users[key][0]);
//         //
//         //                 console.log('\n+++ Collection Id to update is: ' + collection);
//         //                 console.log(`+++ New PostId to push is: ${users[key][aNum]}`);
//         //
//         //                 UpdateCollection.addPost(testUser._id, collection, users[key][aNum], updatedCollection => {
//         //                     return;
//         //                 });
//         //                 console.log('\n _____________________________________');
//         //             };
//         //
//         //             aNum += 1;
//         //
//         //
//         //         });
//         //
//         //     });
//         //
//         //     timesToExecute = 1;
//         //     executedTimes += 1;
//         //     xTimes();
//         // };
//         //
//         // // READS ALL TEST USER POSTS
//         // const funcD = () => {
//         //
//         //     console.log('Oh Hi!');
//         //
//         //     const fields = { collections: 1 };
//         //     return ReadUser.anyFieldsById(testUser._id, testUser._id, fields, foundUser => {
//         //         console.log('Found Collections are: ');
//         //         console.log(foundUser);
//         //     });
//         //
//         // };
//         //
//         // // HELPER TO EXECUTE AN ARRAY OF ASYNC FUNCTIONS IN PARALLEL
//         // let funcArray = [funcA, funcB, funcC, funcD];
//         // let xTimes = () => {
//         //     runXAsyncTimes(funcArray, funcIndex, timesToExecute, executedTimes, cb => {
//         //         funcIndex = cb.funcIndex;
//         //         executedTimes = cb.executedTimes;
//         //         cb.nextFunc();
//         //     });
//         //     // return;
//         // };
//         // xTimes();
//
//         done();
//     });
//
//
//
//
//
//
//
// });
