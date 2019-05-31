// process.on('uncaughtException', function (exception) {
//   console.log(exception);
//   // to see your exception details in the console
//   // if you are on production, maybe you can send the exception details to your
//   // email as well ?
// });
//
// const mongoose = require("mongoose");
// const db = require("../../app/db");
//
// const options =  {
//   server: {
//     reconnectTries: Number.MAX_VALUE,
//     reconnectInterval: 1000, // reconnect after 1 second(s)
//   }
// };
//
// mongoose.Promise = global.Promise;
//
// before(done => {
//   // Code here executes once at the
//   // very beginning of our test suite
//   // before any it test blocks
//   // but describe functions run first
//   db.Mongoose;
//   done();
// });
//
// beforeEach(done => {
//   // Code here executes before any
//   // it test is executed
//   done();
// });
//
// afterEach(() => {
//   // Code here executes after each
//   // it test is executed
// })
//
// after(() => {
//   // Code here executes after all
//   // describe and all it tests have finished
//   // basically at the end when all it tests have been executed
// })
