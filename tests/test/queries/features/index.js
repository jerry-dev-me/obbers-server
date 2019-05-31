process.on("uncaughtException", function(exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

const mongoose = require("mongoose");
const config = require("../../../config");
const db = config.db;
const q = require("../../../../app/queries");
const h = require("../../../helpers");
const datasets = require("../../../data/datasets");

mongoose.Promise = global.Promise;

// before(done => {
before(async function() {
  this.timeout(0);

  db.Mongoose;

  global.testData = {
    // activity: async function() {
    //   return await datasets.activity.all();
    // }
    //
    activity: {
      all: async () => await datasets.activity.all(),
      create: async () => await datasets.activity.fields(),
      read: async () => await datasets.activity.all(),
      update: async () => await datasets.activity.all(),
      delete: async () => await datasets.activity.all(),
    },
    collection: {
      all: async () => await datasets.collection.all(),
      create: async () => await datasets.collection.fields(),
      read: async () => await datasets.collection.all(),
      update: async () => await datasets.collection.all(),
      delete: async () => await datasets.collection.all(),
    },
    comment: {
      all: async () => await datasets.comment.all(),
      create: async () => await datasets.comment.fields(),
      read: async () => await datasets.comment.all(),
      update: async () => await datasets.comment.all(),
      delete: async () => await datasets.comment.all(),
    },
    like: {
      all: async () => await datasets.like.all(),
      create: async () => await datasets.like.fields(),
      read: async () => await datasets.like.all(),
      update: async () => await datasets.like.all(),
      delete: async () => await datasets.like.all(),
    },
    post: {
      all: async () => await datasets.post.all(),
      create: async () => await datasets.post.fields(),
      read: async () => await datasets.post.all(),
      update: async () => await datasets.post.all(),
      delete: async () => await datasets.post.all(),
    },
    report: {
      all: async () => await datasets.report.all(),
      create: async () => await datasets.report.fields(),
      read: async () => await datasets.report.all(),
      update: async () => await datasets.report.all(),
      delete: async () => await datasets.report.all(),
    },
    request: {
      all: async () => await datasets.request.all(),
      create: async () => await datasets.request.fields(),
      read: async () => await datasets.request.all(),
      update: async () => await datasets.request.all(),
      delete: async () => await datasets.request.all(),
    },
    response: {
      all: async () => await datasets.response.all(),
      create: async () => await datasets.response.fields(),
      read: async () => await datasets.response.all(),
      update: async () => await datasets.response.all(),
      delete: async () => await datasets.response.all(),
    },
    tag: {
      all: async () => await datasets.tag.all(),
      create: async () => await datasets.tag.fields(),
      read: async () => await datasets.tag.all(),
      update: async () => await datasets.tag.all(),
      delete: async () => await datasets.tag.all(),
    },
    user: {
      all: async () => await datasets.user.all(),
      create: async () => await datasets.user.fields(),
      read: async () => await datasets.user.all(),
      update: async () => await datasets.user.all(),
      delete: async () => await datasets.user.all(),
    },
  };
});

beforeEach(done => {
  // const {
  //   activities,
  //   users,
  //   posts,
  //   collections,
  //   blockedUsers,
  //   requests,
  //   comments,
  //   responses,
  //   // tags,
  //   // reports
  //   likes
  // } = mongoose.connection.collections;
  //
  // // Nested collections tests
  // activities.drop(() => {
  //   users.drop(() => {
  //     posts.drop(() => {
  //       posts.ensureIndex({ "geometry.coordinates": "2dsphere" })
  //       collections.drop(() => {
  //         requests.drop(() => {
  //           comments.drop(() => {
  //             responses.drop(() => {
  //               likes.drop(() => {
  //                 // tags.drop(() => {
  //                 // Run the next test
  //                 done();
  //                 // });
  //               });
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });

  // const dropActions = await actions.drop();
  // const dropUsers = await actions.drop();
  // const dropPosts = await actions.drop();
  // const dropCollections = await actions.drop();
  // const dropRequests = await actions.drop();
  // const dropComments = await actions.drop();
  // const dropResponses = await actions.drop();
  // const dropLikes = await actions.drop();
  // // done();
  // await Promise.all(
  //   [
  //     dropActions,
  //     dropUsers,
  //     dropPosts,
  //     dropCollections,
  //     dropRequests,
  //     dropComments,
  //     dropResponses,
  //     dropLikes
  //   ]
  // );

  done();
});

after(async function() {
  // delete the global variables used here in the tests...
  // delete all test data....
});
