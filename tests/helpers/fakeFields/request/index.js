module.exports = fields => {
  return {
    fromUserId: (function() {
      if (fields && fields.fromUserId) return fields.fromUserId;
      else return faker.random.uuid();
    })(),
    toUserId: (function() {
      if (fields && fields.toUserId) return fields.toUserId;
      else return faker.random.uuid();
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt;
      else return faker.date.past();
    })(),
    status: (function() {
      if (fields && fields.status) return fields.status;
      else return "PENDING";
    })()
  };
};
