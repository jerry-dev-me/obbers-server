module.exports = fields => {
  return {
    userId: (function() {
      if (fields && fields.userId) return fields.userId
    })(),
    // location: {
    //   coordinates: (function() {
    //     if (fields && fields.location && fields.location.coordinates)
    //     return fields.location.coordinates;
    //   })()
    // },
    location: (function() {
      if (
        fields &&
        fields.location &&
        fields.location.lng &&
        fields.location.lat
      ) {
        return {
          lng: parseFloat(fields.location.lng),
          lat: parseFloat(fields.location.lat),
        }
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
            parseFloat(fields.location.lat),
          ],
        }
      }
    })(),
    content: (function() {
      if (fields && fields.content) return fields.content
    })(),
    createdAt: (function() {
      if (fields && fields.createdAt) return fields.createdAt
      else return new Date()
    })(),
    modifiedAt: (function() {
      if (fields && fields.modifiedAt) return fields.modifiedAt
      else return new Date()
    })(),
    caption: (function() {
      if (fields && fields.caption) return fields.caption
    })(),
    likes: (function() {
      if (fields && fields.likes) return fields.likes
      else return []
    })(),
    totalLikes: [],
    tags: (function() {
      if (fields && fields.tags) return fields.tags
      else return []
    })(),
    commentsEnabled: (function() {
      if (fields && fields.commentsEnabled) return fields.commentsEnabled
      else return true
    })(),
    comments: (function() {
      if (fields && fields.comments) return fields.comments
      else return []
    })(),
    totalComments: [],
  }
}

// module.exports.invalidPost = fields => {
//   return {
//     userId: fields.userId,
//     location: {
//       lat: "1234567",
//       lng: "1234567"
//     },
//     content: "com.invalidContent",
//     createdAt: "invalidDate",
//     modifiedAt: "invalidDate",
//     caption: 1234567,
//     commentsEnabled: "true"
//   };
// };
