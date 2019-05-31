module.exports = fields => {
  return {
    userId: (function() {
      if (fields && fields.userId) return fields.userId
    })(),
    username: (function() {
      if (fields && fields.username) return fields.username
    })(),
    position: (function() {
      if (
        fields &&
        fields.position &&
        fields.position.x !== null &&
        fields.position.y !== null
      ) {
        return fields.position
      } else {
        return { x: 0, y: 0 }
      }
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt
      else return new Date()
    })(),
  }
}
