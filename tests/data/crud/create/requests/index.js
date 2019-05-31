const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-REQUESTS' // logSubgroup

const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createUsers = require('../users')

const createNewRequest = async (sentFromUserId, sentToUserId) => {
  try {
    const fields = { sentFromUserId, sentToUserId, createdAt: new Date() }
    return await q.crud.create.request.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.createRequest = async (sentFromUserId, sentToUserId) => {
  try {
    const request = await createNewRequest(sentFromUserId, sentToUserId)
    return request
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromExistingUsersToExistingUsers = async (
  arrayOfExistingUserIdsSentFrom,
  arrayOfExistingUserIdsSentTo
) => {
  try {
    let ids = []
    let docs = []

    const _createNewRequest = async (sentFromUserId, sentToUserId) => {
      return await createNewRequest(sentFromUserId, sentToUserId)
    }

    await Promise.all(
      arrayOfExistingUserIdsSentFrom.map(async function(sentFromUserId) {
        return Promise.all(
          arrayOfExistingUserIdsSentTo.map(async sentToUserId => {
            const newRequest = await _createNewRequest(
              sentFromUserId,
              sentToUserId
            )
            ids.push(newRequest._id)
            docs.push(newRequest)
          })
        )
      })
    )

    const requestIds = dataObject(
      arrayOfExistingUserIdsSentFrom,
      arrayOfExistingUserIdsSentTo,
      ids,
      docs
    )

    return requestIds
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewUsersToExistingUsers = async (
  numOfNewUsersSentFrom,
  arrayOfExistingUserIdsSentTo
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsersSentFrom)
    const arrayOfExistingUserIdsSentFrom = users.ids

    return await this.fromExistingUsersToExistingUsers(
      arrayOfExistingUserIdsSentFrom,
      arrayOfExistingUserIdsSentTo
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromExistingUsersToNewUsers = async (
  arrayOfExistingUserIdsSentFrom,
  numOfNewUsersSentTo
) => {
  try {
    const users = await createUsers.newPublicUsers(numOfNewUsersSentTo)
    const arrayOfExistingUserIdsSentTo = users.ids

    return await this.fromExistingUsersToExistingUsers(
      arrayOfExistingUserIdsSentFrom,
      arrayOfExistingUserIdsSentTo
    )
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.fromNewUsersToNewUsers = async (
  numOfNewUsersSentFrom,
  numOfNewUsersSentTo
) => {
  try {
    const users1 = await createUsers.newPublicUsers(numOfNewUsersSentFrom)
    const arrayOfExistingUserIdsSentFrom = users1.ids

    const users2 = await createUsers.newPublicUsers(numOfNewUsersSentTo)
    const arrayOfExistingUserIdsSentTo = users2.ids

    return await this.fromExistingUsersToExistingUsers(
      arrayOfExistingUserIdsSentFrom,
      arrayOfExistingUserIdsSentTo
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
    let requests = {
      ids,
      docs,
      idsSentFromUserId: {},
      idsSentToUserId: {},
      docsSentFromUserId: {},
      docsSentToUserId: {},
    }

    arrayOfExistingUserIdsSentFrom.map(sentFromUserId => {
      requests.idsSentFromUserId[sentFromUserId] = []
      requests.docsSentFromUserId[sentFromUserId] = []
      docs.map(doc => {
        if (doc.sentFromUserId.toString() === sentFromUserId.toString()) {
          requests.idsSentFromUserId[sentFromUserId].push(doc._id)
          requests.docsSentFromUserId[sentFromUserId].push(doc)
        }
      })
    })

    arrayOfExistingUserIdsSentTo.map(sentToUserId => {
      requests.idsSentToUserId[sentToUserId] = []
      requests.docsSentToUserId[sentToUserId] = []
      docs.map(doc => {
        if (doc.sentToUserId.toString() === sentToUserId.toString()) {
          requests.idsSentToUserId[sentToUserId].push(doc._id)
          requests.docsSentToUserId[sentToUserId].push(doc)
        }
      })
    })

    return requests
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
