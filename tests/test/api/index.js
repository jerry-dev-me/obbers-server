process.on('uncaughtException', function(exception) {
  console.log(exception)
  // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
})

const mongoose = require('mongoose')
const config = require('../../config')
const db = config.db

const options = {
  server: {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000, // reconnect after 1 second(s)
  },
}

mongoose.Promise = global.Promise

before(done => {
  // Code here executes once at the
  // very beginning of our test suite
  // before any it test blocks
  // but describe functions run first
  db.Mongoose
  done()
})

beforeEach(done => {
  // Code here executes before any
  // it test is executed

  // use agent to signup...
  // if user is already signed up just sign in...
  // save testUser in global.testUser... and agent in global.agent

  // let agent;
  //
  // // super test agent
  // const supertest = require("supertest");
  // const app = require("../../../../server");
  // supertest(config.host);
  // agent = supertest.agent(app);
  //
  // // user authentication
  // return new Promise(async (resolve, reject) => {
  //   let authRoute;
  //   if (isTestUserCreated === false) {
  //     authRoute = "/auth/local/signup";
  //   }
  //   if (isTestUserCreated === true) {
  //     authRoute = "/auth/local/signin";
  //   }
  //
  //   agent
  //     .post(authRoute)
  //     .send({ email: config.testEmail, password: config.testPassword })
  //     .end(async (error, res) => {
  //       if (error) return reject(error);
  //       testUser = await User.findOne({ "local.email": config.testEmail });
  //       isTestUserCreated = true;
  //       th.logger.log(lG, lS, null, { authRoute });
  //       th.logger.log(lG, lS, null, { testUser });
  //       console.log("\nTestUserId: " + testUser._id);
  //
  //       // // create test data
  //       // if (isTestDataCreated === false) {
  //       //   th.logger.log(lG, lS, "Creating Test Data...");
  //       //   isTestDataCreated = true;
  //       //   th.logger.log(lG, lS, null, { testData });
  //       //   console.log("\nTestData is:");
  //       //   console.log(testData);
  //       // }
  //       resolve(res);
  //     });
  // });
  //
  // global.agent = agent;

  done()
})

afterEach(() => {
  // Code here executes after each
  // it test is executed
})

after(() => {
  // Code here executes after all
  // describe and all it tests have finished
  // basically at the end when all it tests have been executed
})
