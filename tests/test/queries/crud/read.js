const assert = require('assert')
const q = require('../../../../app/queries')
const h = require('../../../helpers')

const logger = require('../../../../lib/logger')

const lG = 'TESTS-QUERIES' // logGroup
const lS = 'CRUD-READ' // logSubgroup

describe('\nqueries crud: read functions', async function() {
  this.timeout(0)

  beforeEach(async () => {})

  describe('\nq.crud.read.activity', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })

  describe('\nq.crud.read.collection', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })

  describe('\nq.crud.read.comment', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })

  describe('\nq.crud.read.like', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })

  describe('\nq.crud.read.post', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })

  describe('\nq.crud.read.report', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })

  describe('\nq.crud.read.request', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })

  describe('\nq.crud.read.response', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })

  describe('\nq.crud.read.tag', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })

  describe('\nq.crud.read.user', async function() {
    it('.find()', async () => {})
    it('.findAndPopulate()', async () => {})
    it('.findLeanAndPopulate()', async () => {})
    it('.findOne()', async () => {})
    it('.findOneAndPopulate()', async () => {})
    it('.findOneLeanAndPopulate()', async () => {})
    it('.findById()', async () => {})
    it('.findByIdAndPopulate()', async () => {})
    it('.findByIdLeanAndPopulate()', async () => {})
  })
})

// const findOne = await q.crud.read.user.findOne({ "local.email": newUser.local.email }, { _id: 1 });
// console.log("\n user findOne is:");
// console.log(findOne);
//
// const findById = await q.crud.read.user.findById(newUser._id, { _id: 1 });
// console.log("\n user findById is:");
// console.log(findById);
