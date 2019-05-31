const faker = require("faker");

module.exports = fields => {
  const fakeLng = parseFloat(faker.address.longitude());
  const fakeLat = parseFloat(faker.address.latitude());

  return {
    userId: (function() {
      if (fields && fields.userId) return fields.userId;
      else return faker.random.uuid();
    })(),
    location: (function() {
      if (
        fields &&
        fields.location &&
        fields.location.lng &&
        fields.location.lat
      ) {
        return {
          lng: parseFloat(fields.location.lng),
          lat: parseFloat(fields.location.lat)
        };
      } else {
        return {
          lng: fakeLng,
          lat: fakeLat
        };
      }
    })(),
    geometry: (function() {
      if (
        fields &&
        fields.location &&
        fields.location.lng &&
        fields.location.lat
      ) {
        return {
          type: "Point",
          coordinates: [
            parseFloat(fields.location.lng),
            parseFloat(fields.location.lat)
          ]
        };
      } else {
        return {
          type: "Point",
          coordinates: [fakeLng, fakeLat]
        };
      }
    })(),
    content: (function() {
      if (fields && fields.content) return fields.content;
      // longer than 0 and less than x num
      else return faker.image.imageUrl();
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt;
      else return new Date();
      // else faker.date.past()
    })(),
    modifiedAt: (function() {
      if (fields && fields.modifiedAt) return fields.modifiedAt;
      else return new Date();
      // else faker.date.recent()
    })(),
    caption: (function() {
      if (fields && fields.caption) return fields.caption;
      const genSentence = () => {
        const sentence = faker.lorem.sentence();
        if (sentence.length > 100) genSentence.call(this);
      };
      return genSentence();
    })(),
    commentsEnabled: (function() {
      if (fields && fields.commentsEnabled) return fields.commentsEnabled;
      else return true;
      // else faker.random.boolean()
    })(),
    tags: (function() {
      if (fields && fields.tags) return fields.tags;
    })()
  };
};
