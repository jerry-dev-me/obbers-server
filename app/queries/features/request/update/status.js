const logger = require("../../../../../lib/logger")
const statusAccepted = require("./statusAccepted")
const statusDeclined = require("./statusDeclined")

module.exports = {
  accepted: async (writerId, requestId) => {
    const lG = "QUERIES-FEATURES" // logGroup
    const lS = "REQUEST-U-ACCEPTED" // logSubgroup
    // const newStatus = "ACCEPTED";
    // return await statusAccepted(writerId, requestId, newStatus);
    return await statusAccepted(writerId, requestId)
  },
  declined: async (writerId, requestId) => {
    const lG = "QUERIES-FEATURES" // logGroup
    const lS = "REQUEST-U-DECLINED" // logSubgroup
    // const newStatus = "DECLINED";
    // return await statusDeclined(writerId, requestId, newStatus);
    return await statusDeclined(writerId, requestId)
  },
}
