const c = require('../../../../app/config/constants')
const q = require('../../../../app/queries')

module.exports = {
  account: {
    status: {
      active: async userId => {
        return await q.crud.update.user.findByIdAndUpdate(userId, {
          account: { status: c.ACTIVE },
        })
      },
      inactive: async userId => {
        return await q.crud.update.user.findByIdAndUpdate(userId, {
          account: { status: c.INACTIVE },
        })
      },
      suspended: async userId => {
        return await q.crud.update.user.findByIdAndUpdate(userId, {
          account: { status: c.SUSPENDED },
        })
      },
      banned: async userId => {
        return await q.crud.update.user.findByIdAndUpdate(userId, {
          account: { status: c.BANNED },
        })
      },
    },
    permissions: {
      admin: async userId => {
        return await q.crud.update.user.findByIdAndUpdate(userId, {
          account: { permissions: c.ADMIN },
        })
      },
      readWrite: async userId => {
        return await q.crud.update.user.findByIdAndUpdate(userId, {
          account: { permissions: c.READ_WRITE },
        })
      },
      readOnly: async userId => {
        return await q.crud.update.user.findByIdAndUpdate(userId, {
          account: { permissions: c.READ_ONLY },
        })
      },
    },
  },
}
