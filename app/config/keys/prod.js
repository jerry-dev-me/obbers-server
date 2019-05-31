// app-006-v5
module.exports = {
  port: process.env.PORT,
  host: process.env.HOST || "",
  dbURI: process.env.DB_URI,

  cookieKey: process.env.COOKIE_KEY, // ?????
  sessionSecret: process.env.SESSION_SECRET,

  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/facebook/callback",
    profileFields: ["id", "displayName", "photos"],
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/google/callback",
    profileFields: ["id", "displayName", "photos"],
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.HOST + "/auth/twitter/callback",
    profileFields: ["id", "displayName", "photos"],
  },
}

// PROD KEYS FOR PRODUCTION REGISTERED APPS
/*
facebook: {
  clientID: 453050628468727,
  clientSecret: 5af87c24942ccd778aa270a470ffbcbd
},
google: {
  clientID: 921021535415-83nc5q8nvq0fr6log3b1k5k3vp2n7lsk.apps.googleusercontent.com,
  clientSecret: 910vB8HDrjnXF0DkArHgALlY
},
twitter: {
  consumerKey: xOo9gZnmLryknepuqVXTNwGik,
  consumerSecret: 4L36blSzyXXXsSWdzW6utud5reDN9sRZP6aqgqEPao04z9ba1z
},
*/
