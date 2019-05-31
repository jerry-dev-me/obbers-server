// process.on('uncaughtException', function (exception) {
//   console.log(exception); // to see your exception details in the console
//   // if you are on production, maybe you can send the exception details to your
//   // email as well ?
// });
//
// const mongoose = require("mongoose");
// const db = require("../../app/db");
//
// const options =  {
//   server: {
//     reconnectTries: Number.MAX_VALUE,
//     reconnectInterval: 1000, // reconnect after 1 second(s)
//   }
// };
//
// mongoose.Promise = global.Promise;
//
// // mongoose.connect(db, options, (err) => {
// //   if (err) {
// //     return callback(err);
// //   }
// //   callback();
// // });
//
// // // const configDB = require('../config/database.js');
// // const config = require("../app/config.js");
// // before(done => {
// //   // mongoose.connect(configDB.url);
// //   mongoose.connect(config.dbURI);
// //   mongoose.connection
// //     .once("open", () => {
// //       done();
// //     })
// //     .on("error", error => {
// //       console.warn("Warning", error);
// //     });
// // });
//
// before(done => {
//   db.Mongoose;
//   done();
// });
//
// beforeEach(done => {
//
//   process.on('uncaughtException', function (exception) {
//     console.log(exception); // to see your exception details in the console
//     // if you are on production, maybe you can send the exception details to your
//     // email as well ?
//   });
//
//   // mongoose.connection.collections.users.drop(() => {
//   //     // Run the next test
//   //     done();
//   // });
//
//   const {
//     activities,
//     users,
//     posts,
//     collections,
//     blockedUsers,
//     requests,
//     comments,
//     responses,
//     // tags,
//     // reports
//     likes
//   } = mongoose.connection.collections;
//
//   // Nested collections tests
//   activities.drop(() => {
//     users.drop(() => {
//       posts.drop(() => {
//         posts.ensureIndex({ "geometry.coordinates": "2dsphere" })
//         collections.drop(() => {
//           requests.drop(() => {
//             comments.drop(() => {
//               responses.drop(() => {
//                 likes.drop(() => {
//                   // tags.drop(() => {
//                   // Run the next test
//                   done();
//                   // });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
//
//   // const dropActions = await actions.drop();
//   // const dropUsers = await actions.drop();
//   // const dropPosts = await actions.drop();
//   // const dropCollections = await actions.drop();
//   // const dropRequests = await actions.drop();
//   // const dropComments = await actions.drop();
//   // const dropResponses = await actions.drop();
//   // const dropLikes = await actions.drop();
//   // // done();
//   // await Promise.all(
//   //   [
//   //     dropActions,
//   //     dropUsers,
//   //     dropPosts,
//   //     dropCollections,
//   //     dropRequests,
//   //     dropComments,
//   //     dropResponses,
//   //     dropLikes
//   //   ]
//   // );
//   // done();
// });
