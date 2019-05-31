module.exports = fields => {
  return {
    sentFromUserId: (function() {
      if (fields && fields.sentFromUserId) return fields.sentFromUserId
    })(),
    sentToUserId: (function() {
      if (fields && fields.sentToUserId) return fields.sentToUserId
    })(),
    createdAt: (function() {
      return new Date()
    })(),
    status: (function() {
      return "PENDING"
    })(),
  }
}
