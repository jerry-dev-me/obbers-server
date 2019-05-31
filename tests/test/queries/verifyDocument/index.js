process.on('uncaughtException', function(exception) {
  console.log(exception)
})

const mongoose = require('mongoose')
const config = require('../../../config')
const db = config.db

const options = {
  server: {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000, // reconnect after 1 second(s)
  },
}

mongoose.Promise = global.Promise

before(done => {
  // Code here executes once at the
  // very beginning of our test suite
  // before any it test blocks
  // but describe functions run first
  db.Mongoose
  done()
})

beforeEach(done => {
  // Code here executes before any
  // it test is executed
  done()
})

afterEach(() => {
  // Code here executes after each
  // it test is executed
})

after(() => {
  // Code here executes after all
  // describe and all it tests have finished
  // basically at the end when all it tests have been executed
})
