const logger = require("../../../../../lib/logger")
const lG = "QUERIES-FEATURES" // logGroup
const lS = "ACTIVITY-R-ALL-BY-USERID" // logSubgroup

const h = require("../../../../helpers")
const crud = require("../../../crud")
const verifyDoc = require("../../../verifyDoc")
const verifyUser = require("../../../verifyUser")
const validateOperation = require("../../../validateOperation")
const validateFields = require("../../../validateFields")
const e = require("../../../../errors/queries/features")
const u = require("../../../../../utils")

module.exports = async (readerId, idToRead) => {
  try {
    logger.log(lG, lS, null, { readerId })
    logger.log(lG, lS, null, { idToRead })

    const validation = await validateOperation.read["user"].restriction[
      "followingOnly"
    ](readerId, idToRead)

    logger.log(lG, lS, null, { validation })

    const { docsById } = validation
    logger.log(lG, lS, null, { docsById })

    // pull off latest 10 activities or activities from the past 24 hrs

    const foundActivities = await crud.read.activity.findLeanAndPopulate(
      { userId: idToRead },
      {},
      "userId",
      "info.avatar info.username info.name"
    )

    logger.log(lG, lS, null, { foundActivities })
    if (foundActivities === null || foundActivities === undefined) return []
    if (!(foundActivities && foundActivities.length > 0)) return []

    let activitiesArray = []

    await Promise.all(
      foundActivities.map(async activity => {
        logger.log(lG, lS, null, { activity })

        const canUserReadCreator = await verifyDoc.canUserReadCreator[
          activity.refModel
        ].checkId(readerId, activity.refId)
        logger.log(lG, lS, null, { canUserReadCreator })

        const refDocExists = await verifyDoc.exists[activity.refModel].checkId(
          activity.refId
        )
        logger.log(lG, lS, null, { refDocExists })

        if (canUserReadCreator === true && refDocExists !== false) {
          let activityDoc = {
            _id: activity._id,
            createdAt: activity.createdAt,
            activityType: activity.activityType,
            refModel: activity.refModel,
            refId: activity.refId,
            userId: activity.userId._id,
            avatar: activity.userId.info.avatar,
            username: activity.userId.info.username,
            name: activity.userId.info.name,
          }
          activitiesArray.push(activityDoc)
        }
      })
    )

    logger.log(lG, lS, null, { activitiesArray })

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
