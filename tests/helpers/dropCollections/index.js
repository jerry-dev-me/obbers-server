const mongoose = require('mongoose')

module.exports.all = async () => {
  const {
    activities,
    users,
    posts,
    collections,
    postLikes,
    blockedUsers,
    requests,
    comments,
    responses,
    // tags,
    // reports
    likes,
  } = mongoose.connection.collections

  return new Promise(async (resolve, reject) => {
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
                    // done();
                    // });
                    console.log('\nAll Collections Have Been Dropped!')
                    resolve()
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}
