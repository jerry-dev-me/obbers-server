const assert = require('assert')
const q = require('../../../../app/queries')
const h = require('../../../helpers')

const logger = require('../../../../lib/logger')

const lG = 'TESTS-QUERIES' // logGroup
const lS = 'CRUD-CREATE' // logSubgroup

let newUser
let newUser2
let newPost
let newComment
let newResponse

describe('\nqueries crud: create functions', async function() {
  this.timeout(0)

  before(async () => {
    newUser = await q.crud.create.user.new(th.fakeFields.user())

    postFields = h.fakeFields.post({ userId: newUser._id })
    newPost = await q.crud.create.post.new(postFields)

    commentFields = h.fakeFields.comment({
      userId: newUser._id,
      postId: newPost._id,
    })
    newComment = await q.crud.create.comment.new(commentFields)

    responseFields = h.fakeFields.response({
      userId: newUser._id,
      commentId: newComment._id,
    })
    newResponse = await q.crud.create.response.new(responseFields)

    newUser2 = await q.crud.create.user.new(th.fakeFields.user())
  })

  beforeEach(async () => {
    console.log('\n newUser is:')
    console.log(newUser._id)
    console.log('\n newPost is:')
    console.log(newPost._id)
  })

  it('q.crud.create.activity.new()', async () => {
    const activityFields = {
      userId: newUser._id,
      activityType: 'NEW_POST',
      refModel: 'post',
      refId: newPost._id,
      createdAt: new Date(),
    }
    const newActivity = await q.crud.create.activity.new(activityFields)
    console.log('\n newActivity is:')
    console.log(newActivity)
  })

  it('q.crud.create.collection.new()', async () => {
    const collectionFields = {
      userId: newUser._id,
      name: 'testing q.crud.create.collection.new()',
      // thumbnail: "",
      posts: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }
    const newCollection = await q.crud.create.collection.new(collectionFields)
    console.log('\n newCollection is:')
    console.log(newCollection)
  })

  it('q.crud.create.comment.new()', async () => {
    const commentFields = {
      userId: newUser._id,
      postId: newPost._id,
      content: 'testing q.crud.create.comment.new()',
      likes: [],
      responses: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }
    const newComment = await q.crud.create.comment.new(commentFields)
    console.log('\n newComment is:')
    console.log(newComment)
  })

  it('q.crud.create.like.new()', async () => {
    const likeFields = {
      userId: newUser._id,
      refModel: 'post',
      refId: newPost._id,
      createdAt: new Date(),
    }
    const newLike = await q.crud.create.like.new(likeFields)
    console.log('\n newLike is:')
    console.log(newLike)
  })

  it('q.crud.create.post.new()', async () => {
    const postFields = {
      userId: newUser._id,
      // location: "",
      // geometry: "",
      content: '',
      caption: 'testing q.crud.create.post.new()',
      // commentsEnabled: "",
      likes: [],
      tags: [],
      comments: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }
    const newPost = await q.crud.create.post.new(postFields)
    console.log('\n newPost is:')
    console.log(newPost)
  })

  it('q.crud.create.report.new()', async () => {
    const reportFields = {
      sentFromUserId: newUser._id,
      sentToUserId: newUser2._id,
      // category: "",
      description: 'user is ugly',
      // status: "",
      createdAt: new Date(),
    }
    const newReport = await q.crud.create.report.new(reportFields)
    console.log('\n newReport is:')
    console.log(newReport)
  })

  it('q.crud.create.request.new()', async () => {
    const requestFields = {
      sentFromUserId: newUser._id,
      sentToUserId: newUser2._id,
      // status: "",
      createdAt: new Date(),
    }
    const newRequest = await q.crud.create.request.new(requestFields)
    console.log('\n newRequest is:')
    console.log(newRequest)
  })

  it('q.crud.create.response.new()', async () => {
    const responseFields = {
      userId: newUser._id,
      commentId: newComment._id,
      content: 'testing q.crud.create.response.new()',
      likes: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    const newResponse = await q.crud.create.response.new(responseFields)
    console.log('\n newResponse is:')
    console.log(newResponse)
  })

  // it("q.crud.create.tag.new()", async () => {
  //   const tagFields = {
  //     userId: newUser2._id,
  //     username: newUser2.info.username,
  //     position: { x: 10, y: 10 },
  //     createdAt: new Date()
  //   };
  //
  //   const newTag = await q.crud.create.tag.new(tagFields);
  //   console.log("\n newTag is:");
  //   console.log(newTag);
  // });

  it('q.crud.create.user.new()', async () => {
    const newUser = await q.crud.create.user.new(th.fakeFields.user())
    console.log('\n newUser is:')
    console.log(newUser)
  })
})
