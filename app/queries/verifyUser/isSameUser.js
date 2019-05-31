const logger = require("../../../lib/logger")
const lG = "QUERIES-VERIFY-USER" // logGroup
const lS = "IS-SAME-USER" // logSubgroup

const h = require("../../helpers")
const e = require("../../errors/queries/verifyUser")
const crud = require("../crud")

module.exports = (user1Id, user2Id) => {
  try {
    logger.log(lG, lS, null, { user1Id })
    logger.log(lG, lS, null, { user2Id })

    let isSameUser

    if (user1Id.toString() === user2Id.toString()) isSameUser = true

    if (isSameUser !== true) isSameUser = false

    logger.log(lG, lS, null, { isSameUser })

    return false
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleVerifyUserError(err)
  }
}
