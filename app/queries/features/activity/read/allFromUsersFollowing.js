const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "ACTIVITY-R-ALL-FROM-FOLLOWING" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")
const u = require("../../../../../utils")

module.exports = async readerId => {
  const allByUserId = require("./allByUserId")

  try {
    logger.log(lG, lS, null, { readerId })

    const validation = await validateOperation.validateUser.read(readerId)
    console.log(validation)
    logger.log(lG, lS, null, { validation })

    const userDoc = validation
    logger.log(lG, lS, null, { userDoc })

    const following = userDoc.following
    logger.log(lG, lS, null, { following })

    if (!(following && following.length > 0)) return []

    let activitiesArray = []

    await Promise.all(
      following.map(async userId => {
        logger.log(lG, lS, null, { userId })

        const activities = await allByUserId(readerId, userId)
        logger.log(lG, lS, null, { activities })

        if (activities && activities.length > 0) {
          logger.log(lG, lS, null, { activitiesLength: activities.length })

          activities.map(async activity => {
            logger.log(lG, lS, null, { activity })

            const canUserReadCreator = await verifyDoc.canUserReadCreator[
              activity.refModel
            ].checkId(readerId, activity.refId)

            logger.log(lG, lS, null, { canUserReadCreator })
            if (canUserReadCreator === true) activitiesArray.push(activity)
          })
        }
      })
    )

    const activitiesArraySortedByCreatedAt = u.sortArrayOfObjectsByProp(
      activitiesArray,
      "createdAt"
    )
    logger.log(lG, lS, null, { activitiesArraySortedByCreatedAt })

    return activitiesArraySortedByCreatedAt
  } catch (err) {
    logger.log(lG, lS, null, { err })
    return e.HandleFeatureError(err)
  }
}
