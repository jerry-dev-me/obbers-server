const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-USERS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const modelFields = {
    local: {
      email: req.body.local.email,
      password: req.body.local.password,
    },
    facebook: {
      id: req.body.facebook.id,
      token: req.body.facebook.token,
      email: req.body.facebook.email,
      fullName: req.body.facebook.fullName,
      profilePic: req.body.facebook.profilePic,
    },
    twitter: {
      id: req.body.twitter.id,
      token: req.body.twitter.token,
      fullName: req.body.twitter.fullName,
      username: req.body.twitter.username,
      profilePic: req.body.twitter.profile,
    },
    google: {
      id: req.body.google.id,
      token: req.body.google.token,
      email: req.body.google.email,
      fullName: req.body.google.fullName,
      profilePic: req.body.google.profilePic,
    },
    info: {
      avatar: req.body.info.avatar,
      username: req.body.info.username,
      name: req.body.info.name,
      lastName: req.body.info.lastName,
      phone: req.body.info.phone,
      website: req.body.info.website,
      bio: req.body.info.bio,
      sex: req.body.info.sex,
    },
    account: {
      createdAt: new Date(),
      status: "ACTIVE",
      permissions: "READ_WRITE",
    },
    settings: {
      private: req.body.settings.private,
      language: req.body.settings.language,
      notifications: req.body.settings.notifications,
    },
  }

  const createUser = await q.features.user.create.new(modelFields)

  const resHelper = h.api.resHelper.verifyQueryResults(createUser)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "User Model Fields", { modelFields })
  h.logger.log(lG, lS, "Query Results", { createUser })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
