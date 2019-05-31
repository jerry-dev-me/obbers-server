const logger = require("../../../../lib/logger")
const lG = "HELPERS-AUTH" // logGroup
const lS = "CREATE-NEW-USER-WITH-EMAIL" // logSubgroup

const User = require("../../../models/user")

module.exports = async (email, password) => {
  logger.log(lG, lS, null, { email })
  logger.log(lG, lS, null, { password })

  try {
    let newUser = new User()

    logger.log(lG, lS, null, { newUser })

    newUser.local.email = email
    newUser.local.password = newUser.generateHash(password)
    const savedUser = await newUser.save()

    logger.log(lG, lS, null, { savedUser })

    return savedUser
  } catch (error) {
    logger.log(lG, lS, null, { error })
    return error
  }
}
