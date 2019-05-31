const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-ACTIVITIES' // logSubgroup

const c = require('../../../../../app/config/constants')
const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

module.exports.createActivity = async (
  userId,
  activityType,
  refModel,
  refId
) => {
  try {
    const fields = {
      userId,
      activityType,
      refModel,
      refId,
      createdAt: new Date(),
    }
    return await q.crud.create.activity.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPost = async (userIds, numOfActivities) => {
  try {
    let promises = []

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    userIds.map(userId => {
      idsByUserId[userId] = []
      docsByUserId[userId] = []
    })

    const createPostAndActivity = async userId => {
      const newPost = await q.crud.create.post.new(
        h.fakeFields.post({ userId })
      )
      const refId = newPost._id
      const refModel = 'post'
      const activityType = c.NEW_POST
      const newActivity = await this.createActivity(
        userId,
        activityType,
        refModel,
        refId
      )
      ids.push(newActivity._id)
      docs.push(newActivity)
      idsByUserId[userId].push(newActivity._id)
      docsByUserId[userId].push(newActivity)
      return newActivity
    }
    await Promise.all(
      userIds.map(async userId => {
        for (let i = 0; i < numOfActivities; i++) {
          promises.push(await createPostAndActivity(userId))
        }
      })
    )
    return Promise.all(promises)
      .then(results => {
        return {
          ids,
          docs,
          idsByUserId,
          docsByUserId,
        }
      })
      .catch(error => error)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newComment = async (userIds, numOfActivities) => {
  try {
    let promises = []

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    userIds.map(userId => {
      idsByUserId[userId] = []
      docsByUserId[userId] = []
    })

    const createCommentAndActivity = async userId => {
      const newPost = await q.crud.create.post.new(
        h.fakeFields.post({ userId })
      )
      const newComment = await q.crud.create.comment.new(
        h.fakeFields.comment({
          userId,
          postId: newPost._id,
        })
      )
      const refId = newComment._id
      const refModel = 'comment'
      const activityType = c.NEW_COMMENT
      const newActivity = await this.createActivity(
        userId,
        activityType,
        refModel,
        refId
      )
      ids.push(newActivity._id)
      docs.push(newActivity)
      idsByUserId[userId].push(newActivity._id)
      docsByUserId[userId].push(newActivity)
      return newActivity
    }
    await Promise.all(
      userIds.map(async userId => {
        for (let i = 0; i < numOfActivities; i++) {
          promises.push(await createCommentAndActivity(userId))
        }
      })
    )
    return Promise.all(promises)
      .then(results => {
        return {
          ids,
          docs,
          idsByUserId,
          docsByUserId,
        }
      })
      .catch(error => error)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newResponse = async (userIds, numOfActivities) => {
  try {
    let promises = []

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    userIds.map(userId => {
      idsByUserId[userId] = []
      docsByUserId[userId] = []
    })

    const createResponseAndActivity = async userId => {
      const newPost = await q.crud.create.post.new(
        h.fakeFields.post({ userId })
      )
      const newComment = await q.crud.create.comment.new(
        h.fakeFields.comment({
          userId,
          postId: newPost._id,
        })
      )
      const newResponse = await q.crud.create.response.new(
        h.fakeFields.response({
          userId,
          commentId: newComment._id,
        })
      )
      const refId = newResponse._id
      const refModel = 'response'
      const activityType = c.NEW_RESPONSE
      const newActivity = await this.createActivity(
        userId,
        activityType,
        refModel,
        refId
      )
      ids.push(newActivity._id)
      docs.push(newActivity)
      idsByUserId[userId].push(newActivity._id)
      docsByUserId[userId].push(newActivity)
      return newActivity
    }
    await Promise.all(
      userIds.map(async userId => {
        for (let i = 0; i < numOfActivities; i++) {
          promises.push(await createResponseAndActivity(userId))
        }
      })
    )
    return Promise.all(promises)
      .then(results => {
        return {
          ids,
          docs,
          idsByUserId,
          docsByUserId,
        }
      })
      .catch(error => error)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.postLike = async (userIds, numOfActivities) => {
  try {
    let promises = []

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    userIds.map(userId => {
      idsByUserId[userId] = []
      docsByUserId[userId] = []
    })

    const createLikeAndActivity = async userId => {
      const newPost = await q.crud.create.post.new(
        h.fakeFields.post({ userId })
      )
      const refId = newPost._id
      const refModel = 'post'
      const activityType = c.POST_LIKE
      const newLike = await q.crud.create.like.new({
        userId,
        refModel,
        refId,
        createdAt: new Date(),
      })
      const newActivity = await this.createActivity(
        userId,
        activityType,
        refModel,
        refId
      )
      ids.push(newActivity._id)
      docs.push(newActivity)
      idsByUserId[userId].push(newActivity._id)
      docsByUserId[userId].push(newActivity)
      return newActivity
    }
    await Promise.all(
      userIds.map(async userId => {
        for (let i = 0; i < numOfActivities; i++) {
          promises.push(await createLikeAndActivity(userId))
        }
      })
    )
    return Promise.all(promises)
      .then(results => {
        return {
          ids,
          docs,
          idsByUserId,
          docsByUserId,
        }
      })
      .catch(error => error)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.commentLike = async (userIds, numOfActivities) => {
  try {
    let promises = []

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    userIds.map(userId => {
      idsByUserId[userId] = []
      docsByUserId[userId] = []
    })

    const createCommentAndActivity = async userId => {
      const newPost = await q.crud.create.post.new(
        h.fakeFields.post({ userId })
      )
      const newComment = await q.crud.create.comment.new(
        h.fakeFields.comment({
          userId,
          postId: newPost._id,
        })
      )
      const refId = newComment._id
      const refModel = 'comment'
      const activityType = c.COMMENT_LIKE
      const newLike = await q.crud.create.like.new({
        userId,
        refModel,
        refId,
        createdAt: new Date(),
      })
      const newActivity = await this.createActivity(
        userId,
        activityType,
        refModel,
        refId
      )
      ids.push(newActivity._id)
      docs.push(newActivity)
      idsByUserId[userId].push(newActivity._id)
      docsByUserId[userId].push(newActivity)
      return newActivity
    }
    await Promise.all(
      userIds.map(async userId => {
        for (let i = 0; i < numOfActivities; i++) {
          promises.push(await createCommentAndActivity(userId))
        }
      })
    )
    return Promise.all(promises)
      .then(results => {
        return {
          ids,
          docs,
          idsByUserId,
          docsByUserId,
        }
      })
      .catch(error => error)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.responseLike = async (userIds, numOfActivities) => {
  try {
    let promises = []

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    userIds.map(userId => {
      idsByUserId[userId] = []
      docsByUserId[userId] = []
    })

    const createResponseAndActivity = async userId => {
      const newPost = await q.crud.create.post.new(
        h.fakeFields.post({ userId })
      )
      const newComment = await q.crud.create.comment.new(
        h.fakeFields.comment({
          userId,
          postId: newPost._id,
        })
      )
      const newResponse = await q.crud.create.response.new(
        h.fakeFields.response({
          userId,
          commentId: newComment._id,
        })
      )
      const refId = newResponse._id
      const refModel = 'response'
      const activityType = c.RESPONSE_LIKE
      const newLike = await q.crud.create.like.new({
        userId,
        refModel,
        refId,
        createdAt: new Date(),
      })
      const newActivity = await this.createActivity(
        userId,
        activityType,
        refModel,
        refId
      )
      ids.push(newActivity._id)
      docs.push(newActivity)
      idsByUserId[userId].push(newActivity._id)
      docsByUserId[userId].push(newActivity)
      return newActivity
    }
    await Promise.all(
      userIds.map(async userId => {
        for (let i = 0; i < numOfActivities; i++) {
          promises.push(await createResponseAndActivity(userId))
        }
      })
    )
    return Promise.all(promises)
      .then(results => {
        return {
          ids,
          docs,
          idsByUserId,
          docsByUserId,
        }
      })
      .catch(error => error)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newFollowing = async (userIds, numOfActivities) => {
  try {
    let promises = []

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    userIds.map(userId => {
      idsByUserId[userId] = []
      docsByUserId[userId] = []
    })

    const createUserAndActivity = async userId => {
      const newUser = await q.crud.create.user.new(h.fakeFields.user())
      const update1 = await q.crud.update.user.findByIdAndAddToSet(userId, {
        following: newUser._id,
      })
      const update2 = await q.crud.update.user.findByIdAndAddToSet(
        newUser._id,
        { followers: userId }
      )
      const refId = newUser._id
      const refModel = 'user'
      const activityType = c.NEW_FOLLOWING
      const newActivity = await this.createActivity(
        userId,
        activityType,
        refModel,
        refId
      )
      ids.push(newActivity._id)
      docs.push(newActivity)
      idsByUserId[userId].push(newActivity._id)
      docsByUserId[userId].push(newActivity)
      return newActivity
    }
    await Promise.all(
      userIds.map(async userId => {
        for (let i = 0; i < numOfActivities; i++) {
          promises.push(await createUserAndActivity(userId))
        }
      })
    )
    return Promise.all(promises)
      .then(results => {
        return {
          ids,
          docs,
          idsByUserId,
          docsByUserId,
        }
      })
      .catch(error => error)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.all = async (userIds, numOfActivities) => {
  try {
    let promises = []

    let ids = []
    let docs = []
    let idsByUserId = {}
    let docsByUserId = {}

    userIds.map(userId => {
      idsByUserId[userId] = []
      docsByUserId[userId] = []
    })

    const newPostActivities = await this.newPost(userIds, numOfActivities)
    userIds.map(userId => {
      ids.push(...newPostActivities.ids)
      docs.push(...newPostActivities.docs)
      idsByUserId[userId].push(...newPostActivities.idsByUserId[userId])
      docsByUserId[userId].push(...newPostActivities.docsByUserId[userId])
    })

    const newCommentActivities = await this.newComment(userIds, numOfActivities)

    userIds.map(userId => {
      ids.push(...newCommentActivities.ids)
      docs.push(...newCommentActivities.docs)
      idsByUserId[userId].push(...newCommentActivities.idsByUserId[userId])
      docsByUserId[userId].push(...newCommentActivities.docsByUserId[userId])
    })

    const newResponseActivities = await this.newResponse(
      userIds,
      numOfActivities
    )
    userIds.map(userId => {
      ids.push(...newResponseActivities.ids)
      docs.push(...newResponseActivities.docs)
      idsByUserId[userId].push(...newResponseActivities.idsByUserId[userId])
      docsByUserId[userId].push(...newResponseActivities.docsByUserId[userId])
    })

    const postLikeActivities = await this.postLike(userIds, numOfActivities)
    userIds.map(userId => {
      ids.push(...postLikeActivities.ids)
      docs.push(...postLikeActivities.docs)
      idsByUserId[userId].push(...postLikeActivities.idsByUserId[userId])
      docsByUserId[userId].push(...postLikeActivities.docsByUserId[userId])
    })

    const commentLikeActivities = await this.commentLike(
      userIds,
      numOfActivities
    )
    userIds.map(userId => {
      ids.push(...commentLikeActivities.ids)
      docs.push(...commentLikeActivities.docs)
      idsByUserId[userId].push(...commentLikeActivities.idsByUserId[userId])
      docsByUserId[userId].push(...commentLikeActivities.docsByUserId[userId])
    })

    const responseLikeActivities = await this.responseLike(
      userIds,
      numOfActivities
    )
    userIds.map(userId => {
      ids.push(...responseLikeActivities.ids)
      docs.push(...responseLikeActivities.docs)
      idsByUserId[userId].push(...responseLikeActivities.idsByUserId[userId])
      docsByUserId[userId].push(...responseLikeActivities.docsByUserId[userId])
    })

    const newFollowingActivities = await this.newFollowing(
      userIds,
      numOfActivities
    )
    userIds.map(userId => {
      ids.push(...newFollowingActivities.ids)
      docs.push(...newFollowingActivities.docs)
      idsByUserId[userId].push(...newFollowingActivities.idsByUserId[userId])
      docsByUserId[userId].push(...newFollowingActivities.docsByUserId[userId])
    })

    return {
      ids,
      docs,
      idsByUserId,
      docsByUserId,
    }
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
