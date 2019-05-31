module.exports = (writerId, fields) => {
  return {
    userId: (function() {
      if (fields && fields.userId) return fields.userId
      else return writerId
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt
      else return new Date()
    })(),
    modifiedAt: (function() {
      if (fields && fields.modifiedAt) return fields.modifiedAt
      else return new Date()
    })(),
    name: (function() {
      if (fields && fields.name) return fields.name
      else return "New Collection"
    })(),
    thumbnail: (function() {
      if (fields && fields.posts && fields.posts.length > 0)
        return fields.posts[0]
    })(),
    posts: (function() {
      if (fields && fields.posts && fields.posts.length > 0) return fields.posts
    })(),
  }
}
