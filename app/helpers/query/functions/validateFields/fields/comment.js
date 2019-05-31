module.exports = fields => {
  return {
    postId: (function() {
      if (fields && fields.postId) return fields.postId
    })(),
    userId: (function() {
      if (fields && fields.userId) return fields.userId
      else return writerId
    })(),
    content: (function() {
      if (fields && fields.content) return fields.content
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt
      else return new Date()
    })(),
    modifiedAt: (function() {
      if (fields && fields.modifiedAt) return fields.modifiedAt
      else return new Date()
    })(),
    responses: (function() {
      if (fields && fields.responses) return fields.responses
    })(),
    totalResponses: [],
    likes: (function() {
      if (fields && fields.likes) return fields.likes
    })(),
    totalLikes: [],
  }
}
