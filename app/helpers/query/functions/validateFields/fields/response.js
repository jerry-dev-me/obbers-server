module.exports = (writerId, fields) => {
  return {
    commentId: (function() {
      if (fields && fields.commentId) return fields.commentId
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
    likes: (function() {
      if (fields && fields.likes && fields.likes.length > 0) return fields.likes
    })(),
    totalLikes: [],
  }
}
