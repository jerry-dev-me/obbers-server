const localDb = "localhost:27017/social-app-v1-dev";
const remoteDb =
  "mongodb://gerardg:password@ds133920.mlab.com:33920/social-app-dev";

module.exports = {
  port: 5000,
  host: "https://127.0.0.1:5000",
  host2: "https://192.168.0.17:5000",
  dbURI: localDb,

  cookieKey: "jsdfkdsabfjadsfjadbfsdkjfbsdjkfksdfdskn", // ?????
  sessionSecret: "omaigaomaigaomaigaomaigaomaiga",

  local: {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  facebook: {
    clientID: "1662085103877870",
    clientSecret: "d71b74cb8398b4ccc8e4680ff4ccc23f",
    // callbackURL: '//127.0.0.1:5000/auth/facebook/callback',
    callbackURL: "https://1d4dedae.ngrok.io/auth/facebook/callback",
    passReqToCallback: true,
    enableProof: true,
    profileFields: ["id", "displayName", "photos"]
  },
  google: {
    clientID:
      "1041381692623-9n94ca74r828rcl1cachtkm50gkdcp99.apps.googleusercontent.com",
    clientSecret: "Y2OhFEnq_Ry0JNngk42NMGSd",
    callbackURL: "//127.0.0.1:5000/auth/google/callback",
    passReqToCallback: true,
    profileFields: ["profile"]
  },
  twitter: {
    consumerKey: "9AE7JAWfNMp2bsqlOZvuj1xWm",
    consumerSecret: "1SvLTZN0K1tCTW40tjowtyH7R9mdEmUUm8pfmf12YKi0rR4ElS",
    callbackURL: "//127.0.0.1:5000/auth/twitter/callback",
    passReqToCallback: true,
    profileFields: ["id", "displayName", "photos"]
  }
};
