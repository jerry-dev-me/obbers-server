process.on('uncaughtException', function(exception) {
  console.log(exception)
})

const mongoose = require('mongoose')
const config = require('../../../config')
const db = config.db
const q = require('../../../../app/queries')
const h = require('../../../helpers')
const datasets = require('../../../data/datasets')
const create = require('../../../data/crud/create')

mongoose.Promise = global.Promise

before(async function() {
  this.timeout(0)
  db.Mongoose

  global.testData = await require('./testData')()
})

beforeEach(done => {
  done()
})

after(async function() {
  // await h.dropCollections();
})
