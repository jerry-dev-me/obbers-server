const logger = require('../../../../../lib/logger')
const lG = 'TESTDATA' // logGroup
const lS = 'CREATE-USERS' // logSubgroup

const c = require('../../../../../app/config/constants')
const q = require('../../../../../app/queries')
const h = require('../../../../helpers')

const createNewUser = async fields => {
  try {
    return await q.crud.create.user.new(fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

const updateSettingsPrivate = {
  true: async userId => {
    try {
      const fields = { 'settings.private': true }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  false: async userId => {
    try {
      const fields = { 'settings.private': false }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
}

const updateAccountPermissions = {
  admin: async userId => {
    try {
      const fields = { 'account.permissions': c.ADMIN }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  readWrite: async userId => {
    try {
      const fields = { 'account.permissions': c.READ_WRITE }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
  readOnly: async userId => {
    try {
      const fields = { 'account.permissions': c.READ_ONLY }
      return await q.crud.update.user.findByIdAndUpdate(userId, fields)
    } catch (err) {
      logger.log(lG, lS, null, { err })
      throw err
    }
  },
}

module.exports.createUsers = async (numOfNewUsers, fields) => {
  try {
    let ids = []
    let docs = []

    const createUser = async () => {
      let newUser
      if (fields === null || fields === undefined) {
        newUser = await createNewUser(h.fakeFields.user())
      } else {
        newUser = await createNewUser(h.fakeFields.user(fields))
      }
      ids.push(newUser._id)
      docs.push(newUser)
    }

    let promises = []
    for (let i = 0; i < numOfNewUsers; i++) {
      promises.push(await createUser())
    }

    return Promise.all(promises)
      .then(results => {
        return { ids, docs }
      })
      .catch(error => {
        return error
      })
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPublicUsers = async numOfNewUsers => {
  try {
    const fields = { settings: { private: false } }
    return await this.createUsers(numOfNewUsers, fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newPrivateUsers = async numOfNewUsers => {
  try {
    const fields = { settings: { private: true } }
    return await this.createUsers(numOfNewUsers, fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.newUsersAdmin = async numOfNewUsers => {
  try {
    const fields = { account: { permissions: c.ADMIN } }
    return await this.createUsers(numOfNewUsers, fields)
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.makeExistingUsersAdmin = async arrayOfExistingUserIds => {
  try {
    let ids = []
    let docs = []
    return Promise.all(
      arrayOfExistingUserIds.map(async userId => {
        const updatedUser = await updateAccountPermissions.admin(userId)
        ids.push(updatedUser._id)
        docs.push(updatedUser)
      })
    ).then(() => {
      return { ids, docs }
    })
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.updateUsersSettingsPrivateToTrue = async arrayOfExistingUserIds => {
  try {
    let ids = []
    let docs = []
    return Promise.all(
      arrayOfExistingUserIds.map(async userId => {
        const updatedUser = await updateSettingsPrivate.true(userId)
        ids.push(updatedUser._id)
        docs.push(updatedUser)
      })
    ).then(() => {
      return { ids, docs }
    })
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}

module.exports.updateUsersSettingsPrivateToFalse = async arrayOfExistingUserIds => {
  try {
    let ids = []
    let docs = []
    return Promise.all(
      arrayOfExistingUserIds.map(async userId => {
        const updatedUser = await updateSettingsPrivate.false(userId)
        ids.push(updatedUser._id)
        docs.push(updatedUser)
      })
    ).then(() => {
      return { ids, docs }
    })
  } catch (err) {
    logger.log(lG, lS, null, { err })
    throw err
  }
}
