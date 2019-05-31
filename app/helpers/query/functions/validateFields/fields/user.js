module.exports = fields => {
  return {
    local: {
      email: (function() {
        if (fields && fields.local && fields.local.email)
          return fields.local.email
        else return null
      })(),
      password: (function() {
        if (fields && fields.local && fields.local.password)
          return fields.local.password
        else return null
      })(),
    },
    info: {
      avatar: (function() {
        if (fields && fields.info && fields.info.avatar)
          return fields.info.avatar
        else return null
      })(),
      username: (function() {
        if (fields && fields.info && fields.info.username)
          return fields.info.username
        else return null
      })(),
      name: (function() {
        if (fields && fields.info && fields.info.name) return fields.info.name
        else return null
      })(),
      lastName: (function() {
        if (fields && fields.info && fields.info.lastName)
          return fields.info.lastName
        else return null
      })(),
      phone: (function() {
        if (fields && fields.info && fields.info.phone) return fields.info.phone
        else return null
      })(),
      website: (function() {
        if (fields && fields.info && fields.info.website)
          return fields.info.website
        else return null
      })(),
      bio: (function() {
        if (fields && fields.info && fields.info.bio) return fields.info.bio
        else return null
      })(),
      sex: (function() {
        if (fields && fields.info && fields.info.sex) return fields.info.sex
        else return "Not Specified"
      })(),
    },
    account: {
      createdAt: (function() {
        if (fields && fields.account && fields.account.createdAt)
          return fields.account.createdAt
        else return new Date()
      })(),
      status: (function() {
        if (fields && fields.account && fields.account.status)
          return fields.account.status
        else return "ACTIVE"
      })(),
      permissions: (function() {
        if (fields && fields.account && fields.account.permissions)
          return fields.account.permissions
        else return "READ_WRITE"
      })(),
    },
    settings: {
      private: (function() {
        if (fields && fields.settings && fields.settings.private)
          return fields.settings.private
        else return false
      })(),
      language: (function() {
        if (fields && fields.settings && fields.settings.language)
          return fields.settings.language
        else return "english"
      })(),
      notifications: (function() {
        if (fields && fields.settings && fields.settings.notifications)
          return fields.settings.notifications
        else return true
      })(),
    },
  }
}
