module.exports = fields => {
  return {
    sentFromUserId: (function() {
      if (fields && fields.sentFromUserId) return fields.sentFromUserId
    })(),
    sentToUserId: (function() {
      if (fields && fields.sentToUserId) return fields.sentToUserId
    })(),
    category: (function() {
      if (fields && fields.category) return fields.category
      else return "OTHER"
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt
      else return new Date()
    })(),
    description: (function() {
      if (fields && fields.description) return fields.description
    })(),
    status: (function() {
      if (fields && fields.status) return fields.status
      else return "UNREAD"
    })(),
  }
}
