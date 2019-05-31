const h = require("../../../../../helpers")
const q = require("../../../../../queries")

const lG = "API" // logGroup
const lS = "CONTROLLERS-COLLECTIONS" // logSubgroup

module.exports = async (req, res, next) => {
  h.logger.log(lG, lS, null, { req: h.stringifyCircularJSON(req) })
  h.logger.log(lG, lS, null, { res: h.stringifyCircularJSON(res) })

  const writerId = req.user.id
  const name = req.body.name
  const posts = req.body.posts

  const modelFields = {
    userId: writerId,
    createdAt: new Date(),
    modifiedAt: new Date(),
    name: name,
    thumbnail: (function() {
      if (req && req.body && req.body.posts) return posts[0]
      else return null
    })(),
    posts: (function() {
      if (req && req.body && req.body.posts) return posts
      else return null
    })(),
  }

  const createCollection = await q.features.collection.create.new(
    writerId,
    modelFields
  )

  const resHelper = h.api.resHelper.verifyQueryResults(createCollection)

  const { statusCode, resources } = resHelper

  h.logger.log(lG, lS, "req.user.id", { writerId })
  h.logger.log(lG, lS, "req.body.name", { name })
  h.logger.log(lG, lS, "req.body.posts", { posts })
  h.logger.log(lG, lS, "Collection Model Fields", { modelFields })
  h.logger.log(lG, lS, "Query Results", { createCollection })
  h.logger.log(lG, lS, null, { statusCode })
  h.logger.log(lG, lS, null, { resources })

  res.status(statusCode).json(resources)
}
