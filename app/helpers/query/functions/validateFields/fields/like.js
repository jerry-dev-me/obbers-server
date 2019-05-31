module.exports = (userId, refModel, refId) => {
  return {
    refModel: (function() {
      return refModel
    })(),
    refId: (function() {
      return refId
    })(),
    userId: (function() {
      return userId
    })(),
    createdAt: (function() {
      return new Date()
    })(),
  }
}
