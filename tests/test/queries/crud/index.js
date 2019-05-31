process.on('uncaughtException', function(exception) {
  console.log(exception) // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
})

const mongoose = require('mongoose')
const config = require('../../../config')
const db = config.db

mongoose.Promise = global.Promise

// before(done => {
before(async function() {
  db.Mongoose
})

beforeEach(done => {
  const {
    activities,
    users,
    posts,
    collections,
    blockedUsers,
    requests,
    comments,
    responses,
    // tags,
    // reports
    likes,
  } = mongoose.connection.collections

  // Nested collections tests
  activities.drop(() => {
    users.drop(() => {
      posts.drop(() => {
        posts.ensureIndex({ 'geometry.coordinates': '2dsphere' })
        collections.drop(() => {
          requests.drop(() => {
            comments.drop(() => {
              responses.drop(() => {
                likes.drop(() => {
                  // tags.drop(() => {
                  // Run the next test
                  done()
                  // });
                })
              })
            })
          })
        })
      })
    })
  })

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
  // done();
})

after(async function() {
  // delete the global variables used here in the tests...
})
