const faker = require("faker");

module.exports = fields => {
  return {
    userId: (function() {
      if (fields && fields.userId) return fields.userId;
      else return faker.random.uuid();
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt;
      else return faker.date.past();
    })(),
    modifiedAt: (function() {
      if (fields && fields.modifiedAt) return fields.modifiedAt;
      else return faker.date.recent();
    })(),
    name: (function() {
      if (fields && fields.name) return fields.name;
      else return faker.lorem.sentence();
    })(),
    thumbnail: (function() {
      if (fields && fields.thumbnail) return fields.thumbnail;
    })(),
    posts: (function() {
      if (fields && fields.posts) return fields.posts;
    })()
  };
};
