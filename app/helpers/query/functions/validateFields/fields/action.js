module.exports = fields => {
  return {
    refModel: (function() {
      if (fields && fields.refModel) return fields.refModel
    })(),
    refId: (function() {
      if (fields && fields.refId) return fields.refId
    })(),
    userId: (function() {
      if (fields && fields.userId) return fields.userId
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt
      else return new Date()
    })(),
    activityType: (function() {
      if (fields && fields.activityType) return fields.activityType
    })(),
  }
}
