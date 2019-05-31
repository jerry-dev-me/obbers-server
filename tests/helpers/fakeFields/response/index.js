const faker = require("faker");

module.exports = fields => {
  return {
    commentId: (function() {
      if (fields && fields.commentId) return fields.commentId;
      else return faker.random.uuid();
    })(),
    userId: (function() {
      if (fields && fields.userId) return fields.userId;
      else return faker.random.uuid();
    })(),
    content: (function() {
      if (fields && fields.content) return fields.content;
      // longer than 0 and less than x num
      else return faker.lorem.sentence();
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt;
      else return faker.date.past();
    })(),
    modifiedAt: (function() {
      if (fields && fields.modifiedAt) return fields.modifiedAt;
      else return faker.date.recent();
    })()
  };
};
