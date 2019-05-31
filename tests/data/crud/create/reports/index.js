const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-REPORTS' // logSubgroup

const c = require('../../../../../app/config/constants')
const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')

const createNewReport = async fields => {
  try {
    return await q.crud.create.report.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromExistingUsersToExistingUsers = async (
  arrayOfExistingUserIdsSentFrom,
  arrayOfExistingUserIdsSentTo,
  category
) => {
  try {
    let description
    if (category === null || category === undefined) {
      const cat = Math.floor(Math.random() * 4) + 1
      if (cat === 1) {
        category = c.OTHER
      } else if (cat === 2) {
        category = c.SPAM_BEHAVIOUR
      } else if (cat === 3) {
        category = c.AGGRESSIVE_BEHAVIOUR
      } else if (cat === 4) {
        category = c.EXPLICIT_CONTENT
      }
    }
    if (category === c.OTHER) description = 'user is problematic'
    if (category === c.SPAM_BEHAVIOUR) description = 'user is spamming'
    if (category === c.AGGRESSIVE_BEHAVIOUR) description = 'user is aggressive'
    if (category === c.EXPLICIT_CONTENT)
      description = 'user is posting explicit content'

    let ids = []
    let docs = []

    await Promise.all(
      await arrayOfExistingUserIdsSentFrom.map(async function(sentFromUserId) {
        return Promise.all(
          await arrayOfExistingUserIdsSentTo.map(async sentToUserId => {
            const fields = {
              sentFromUserId,
              sentToUserId,
              category,
              description,
              createdAt: new Date(),
            }
            const newReport = await createNewReport(fields)

            ids.push(newReport._id)
            docs.push(newReport)
          })
        )
      })
    )

    return dataObject(
      arrayOfExistingUserIdsSentFrom,
      arrayOfExistingUserIdsSentTo,
      ids,
      docs
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewUsersToExistingUsers = async (
  numOfNewUsersSentFrom,
  arrayOfExistingUserIdsSentTo,
  category
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsersSentFrom)
    const arrayOfExistingUserIdsSentFrom = users.ids

    return await this.fromExistingUsersToExistingUsers(
      arrayOfExistingUserIdsSentFrom,
      arrayOfExistingUserIdsSentTo,
      category
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromExistingUsersToNewUsers = async (
  arrayOfExistingUserIdsSentFrom,
  numOfNewUsersSentTo,
  category
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsersSentTo)
    const arrayOfExistingUserIdsSentTo = users.ids

    return await this.fromExistingUsersToExistingUsers(
      arrayOfExistingUserIdsSentFrom,
      arrayOfExistingUserIdsSentTo,
      category
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewUsersToNewUsers = async (
  numOfNewUsersSentFrom,
  numOfNewUsersSentTo,
  category
) => {
  try {
    const users1 = await createUsers.newPublicUsers(numOfNewUsersSentFrom)
    const arrayOfExistingUserIdsSentFrom = users1.ids

    const users2 = await createUsers.newPublicUsers(numOfNewUsersSentTo)
    const arrayOfExistingUserIdsSentTo = users2.ids

    return await this.fromExistingUsersToExistingUsers(
      arrayOfExistingUserIdsSentFrom,
      arrayOfExistingUserIdsSentTo,
      category
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

const dataObject = async (
  arrayOfExistingUserIdsSentFrom,
  arrayOfExistingUserIdsSentTo,
  ids,
  docs
) => {
  try {
    let reports = {
      ids: [],
      docs: [],
      idsSentFromUserId: {},
      idsSentToUserId: {},
      docsSentFromUserId: {},
      docsSentToUserId: {},
    }

    arrayOfExistingUserIdsSentFrom.map(sentFromUserId => {
      reports.idsSentFromUserId[sentFromUserId] = []
      reports.docsSentFromUserId[sentFromUserId] = []
      docs.map(doc => {
        reports.docs.push(doc)
        if (doc.sentFromUserId.toString() === sentFromUserId.toString()) {
          reports.idsSentFromUserId[sentFromUserId].push(doc._id)
          reports.docsSentFromUserId[sentFromUserId].push(doc)
        }
      })
    })

    arrayOfExistingUserIdsSentTo.map(sentToUserId => {
      reports.idsSentToUserId[sentToUserId] = []
      reports.docsSentToUserId[sentToUserId] = []
      docs.map(doc => {
        reports.docs.push(doc)
        if (doc.sentToUserId.toString() === sentToUserId.toString()) {
          reports.idsSentToUserId[sentToUserId].push(doc._id)
          reports.docsSentToUserId[sentToUserId].push(doc)
        }
      })
    })

    return reports
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
