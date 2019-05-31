const assert = require('assert')

describe('\nquery function: getTotal()', async function() {
  this.timeout(0)

  describe('\ntest: create operations, validate model fields', async function() {
    before(async () => {
      console.log('BEFORE')
    })

    beforeEach(async () => {
      console.log('BEFORE_EACH')
    })

    it('create a new action document with valid fields', async () => {
      console.log('IT TEST')
    })

    it('create a new action document with invalid fields', async () => {
      console.log('IT TEST')
    })

    it('create a new action document with invalid fields', async () => {
      console.log('IT TEST')
    })

    afterEach(async () => {
      console.log('AFTER_EACH')
    })

    after(async () => {
      console.log('AFTER')
    })
  })
})
