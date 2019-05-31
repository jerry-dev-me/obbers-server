const assert = require('assert')
const q = require('../../../../app/queries')
const h = require('../../../helpers')

const logger = require('../../../../lib/logger')

const lG = 'TESTS-QUERIES' // logGroup
const lS = 'CRUD-DELETE' // logSubgroup

describe('\nqueries crud: delete functions', async function() {
  this.timeout(0)

  beforeEach(async () => {})

  describe('\nq.crud.delete.activity', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })

  describe('\nq.crud.delete.collection', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })

  describe('\nq.crud.delete.comment', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })

  describe('\nq.crud.delete.like', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })

  describe('\nq.crud.delete.post', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })

  describe('\nq.crud.delete.report', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })

  describe('\nq.crud.delete.request', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })

  describe('\nq.crud.delete.response', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })

  describe('\nq.crud.delete.tag', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })

  describe('\nq.crud.delete.user', async function() {
    it('.remove()', async () => {})
    it('.findByIdAndRemove()', async () => {})
  })
})
