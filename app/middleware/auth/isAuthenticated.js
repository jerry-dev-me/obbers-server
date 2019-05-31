// const logger = require("../../../../lib/logger");
// const lG = "HELPERS-AUTH"; // logGroup
// const lS = "IS-AUTHENTICATED"; // logSubgroup
//
// const stringifyCircularJSON = require("../../utils/stringifyCircularJSON");
//
// module.exports = (req, res, next) => {
//   logger.log(lG, lS, null, { req: stringifyCircularJSON(req) });
//   logger.log(lG, lS, null, { res: stringifyCircularJSON(res) });
//
//   logger.log(lG, lS, null, { originalUrl: req.originalUrl });
//
//   const pathsArray = [
//     "/auth/local/signup",
//     "/auth/local/signin"
//   ];
//
//   logger.log(lG, lS, null, { pathsArray });
//
//   let isOriginalUrlFoundOnPathsArray = false;;
//   pathsArray.map(path => {
//     if (req.originalUrl === path) {
//       isOriginalUrlFoundOnPathsArray = true;
//     }
//   });
//
//   logger.log(lG, lS, null, { isOriginalUrlFoundOnPathsArray });
//
//   const redirect = () => {
//     res.status(401).json({ message: "You cannot visit this route" });
//     // res.redirect("/");
//   };
//
//   // if (req.user) {
//   //   logger.log(lG, lS, `req.user === true`);
//   //   // return isOriginalUrlFoundOnPathsArray ? res.redirect('/') : next();
//   //   return isOriginalUrlFoundOnPathsArray ? redirect() : next();
//   // } else {
//   //   logger.log(lG, lS, `req.user === false`);
//   //   // return isOriginalUrlFoundOnPathsArray ? next() : res.redirect('/');
//   //   return isOriginalUrlFoundOnPathsArray ? next() : redirect();
//   // }
//
//   if (req.isAuthenticated()) {
//     logger.log(lG, lS, `req.isAuthenticated === true`);
//     // return isOriginalUrlFoundOnPathsArray ? res.redirect('/') : next();
//     return isOriginalUrlFoundOnPathsArray ? redirect() : next();
//   } else {
//     logger.log(lG, lS, `req.isAuthenticated === false`);
//     // return isOriginalUrlFoundOnPathsArray ? next() : res.redirect('/');
//     return isOriginalUrlFoundOnPathsArray ? next() : redirect();
//   }
// };
