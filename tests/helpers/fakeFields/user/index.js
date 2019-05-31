const faker = require("faker");
const c = require("../../../../app/config").constants;

module.exports = fields => {
  return {
    local: {
      email: (function() {
        if (fields && fields.local && fields.local.email)
          return fields.local.email;
        const genEmail = () => {
          const email = faker.internet.email();
          if (email.length < 3) genEmail.call(this);
        };
        return genEmail();
        // else return faker.internet.email;
      })(),
      password: (function() {
        if (fields && fields.local && fields.local.password)
          return fields.local.password;
        const genPassword = () => {
          const password = faker.internet.password();
          if (password.length < 8) genPassword.call(this);
        };
        return genPassword();
        // else return faker.internet.password;
      })()
    },
    info: {
      avatar: (function() {
        if (fields && fields.info && fields.info.avatar)
          return fields.info.avatar;
        else return faker.internet.avatar();
      })(),
      username: (function() {
        if (fields && fields.info && fields.info.username)
          return fields.info.username;
        let isUsernameValid;
        const genUsername = () => {
          const username = faker.internet.userName();
          if (username.length < 4) isUsernameValid = false;
          else isUsernameValid = true;
          if (isUsernameValid !== true) genUsername.call(this);
          else return username;
        };
        return genUsername();
        // else return faker.internet.userName();
      })(),
      name: (function() {
        if (fields && fields.info && fields.info.name) return fields.info.name;
        else return faker.name.firstName();
      })(),
      lastName: (function() {
        if (fields && fields.info && fields.info.lastName)
          return fields.info.lastName;
        else return faker.name.lastName();
      })(),
      phone: (function() {
        if (fields && fields.info && fields.info.phone)
          return fields.info.phone;
        else return faker.phone.phoneNumber();
      })(),
      website: (function() {
        if (fields && fields.info && fields.info.website)
          return fields.info.website;
        else return faker.internet.url();
      })(),
      bio: (function() {
        if (fields && fields.info && fields.info.bio) return fields.info.bio;
        else return faker.lorem.paragraph();
      })(),
      sex: (function() {
        if (fields && fields.info && fields.info.sex) return fields.info.sex;
        else return "Not Specified";
      })()
    },
    account: {
      createdAt: (function() {
        if (fields && fields.account && fields.account.createdAt)
          return fields.account.createdAt;
        else return new Date();
      })(),
      status: (function() {
        if (fields && fields.account && fields.account.status)
          return fields.account.status;
        else return c.ACTIVE;
      })(),
      permissions: (function() {
        if (fields && fields.account && fields.account.permissions)
          return fields.account.permissions;
        else return c.READ_WRITE;
      })()
    },
    settings: {
      private: (function() {
        if (fields && fields.settings && fields.settings.private)
          return fields.settings.private;
        else return false;
      })(),
      language: (function() {
        if (fields && fields.settings && fields.settings.language)
          return fields.account.language;
        else return c.ENGLISH;
      })(),
      notifications: (function() {
        if (fields && fields.settings && fields.settings.notifications)
          return fields.account.notifications;
        else return true;
      })()
    }
  };
};
