// const fs = require('fs');
// // const fse = require('fs-extra');
// const { promisify } = require('util');
// const readdir = promisify(fs.readdir);
// const util = require("util");
//
// const path = require('path');
//
// const config = require('../config');
// const logSettings = require('../config').settings;
// const logGroups = require('../config').logGroups;
//
// const localMemory = require("./localMemory");
// const verify = require("./verify");
//
// const removeAllFilesFromDirectories = async directories => {
//
//   console.log("\nRemoving all files from the next directories:");
//   console.log(directories);
//
//   // console.log("\nVERY FIRST");
//   // let directories = [
//   //   logSettings.saveLocations.allLogs,
//   //   logSettings.saveLocations.logsByLogGroup,
//   //   logSettings.saveLocations.logsByLogSubgroup
//   // ];
//   //
//   // await Promise.all(
//   //   directories.map(directory => {
//   //
//   //     const newPromise = new Promise((resolve, reject) => {
//   //       return fs.readdir(directory, (error, files) => {
//   //         if (error) {
//   //           reject(error);
//   //         };
//   //         resolve(files);
//   //       });
//   //     });
//   //
//   //     return newPromise
//   //       .then(files => {
//   //         console.log("\nDirectory Files found Are:");
//   //         console.log(files);
//   //       })
//   //       .catch(error => console.log(error));
//   //   })
//   // );
//
//   console.log("\nABOUT TO MAP DIRECTORIES...");
//
//   await Promise.all(
//     directories.map(directory => {
//
//       console.log("\nDIRECTORY IS: " + directory);
//
//       const newPromise = new Promise((resolve, reject) => {
//         return fs.readdir(directory, (error, files) => {
//           if (error) {
//             reject(error);
//           };
//           resolve(files);
//         });
//       });
//
//       return newPromise
//         .then(async files => {
//           console.log("\nNUM OF FILES FOUND AT DIRECTORY " + directory);
//           console.log("ARE: " + files.length);
//           console.log("\nFILES ARE:");
//           console.log(files);
//
//           if (files.length > 0) {
//             // await Promise.all(
//
//             await Promise.all(
//               files.map(file => {
//                 if (!(file === null || file === undefined)) {
//
//                   const nestedPromise = new Promise((resolve, reject) => {
//                     return fs.unlink(path.join(directory, file), error => {
//                       if (error) {
//                         // console.log(error);
//                         reject(error);
//                       };
//                       resolve(file);
//                     });
//                   });
//
//                   return nestedPromise
//                     .then(file => {
//                       console.log("\nREMOVED FILE: " + file);
//                       console.log("FROM DIRECTORY: " + directory);
//                     })
//                     .catch(error => console.log(error));
//
//                 };
//               })
//             );
//               // for (const file of files) {
//               //   if (!(file === null || file === undefined)) {
//               //
//               //     const nestedPromise = new Promise((resolve, reject) => {
//               //       return fs.unlink(path.join(directory, file), error => {
//               //         if (error) {
//               //           // console.log(error);
//               //           reject(error);
//               //         };
//               //         resolve(file);
//               //       });
//               //     });
//               //
//               //     return nestedPromise
//               //       .then(file => {
//               //         console.log("\nREMOVED FILE: " + file);
//               //         console.log("FROM DIRECTORY: " + directory);
//               //       })
//               //       .catch(error => console.log(error));
//               //
//               //   };
//               // }
//
//             // )
//           };
//
//         })
//         .catch(error => console.log(error));
//     })
//   );
//
//
//
//   // await readdir(directory, (error, files) => {
//   //   console.log("\nNumber of files found in directory: " + directory + " are: " + files.length);
//   //   if (error) {
//   //     console.log(error);
//   //     reject(error);
//   //   };
//   //   if (files.length > 0) {
//   //     console.log("\nThe next files were found inside directory: " + directory);
//   //     console.log(files);
//   //     for (const file of files) {
//   //       if (!(file === null || file === undefined)) {
//   //         fs.unlink(path.join(directory, file), error => {
//   //           if (error) {
//   //             console.log(error);
//   //             reject(error);
//   //           };
//   //           console.log("\nRemoved file: " + file);
//   //           console.log("from directory: " + directory);
//   //           resolve(file);
//   //         });
//   //       };
//   //     };
//   //   };
//   // });
//
//
//
//
//   // const mapDirectories = await (async () => {
//   //   console.log("\nMapping directories...");
//   //   await Promise.all(
//   //     await directories.map(async directory => {
//   //       console.log("\nMapping files inside directory: " + directory);
//   //
//   //       // const readFilesFromDirectory = async () => {
//   //       //   return new Promise(async (resolve, reject) => {
//   //       //     await fs.readdir(directory, function(error, file) {
//   //       //       if (error) reject (error);
//   //       //       console.log("\nInside directory: " + directory);
//   //       //       console.log("File: " + file);
//   //       //       resolve(file);
//   //       //     })
//   //       //   })
//   //       // };
//   //       // readFilesFromDirectory().then(file => {
//   //       //   console.log("\nFile found is: " + file);
//   //       // })
//   //
//   //       var promise = doSomeAsynchronousOperation();
//   //       promise.then( function(result) {
//   //           // yay! I got the result.
//   //           console.log("\nInside directory: " + directory);
//   //           console.log("File: " + result);
//   //       }, function(error) {
//   //           // The promise was rejected with this error.
//   //           console.log(error);
//   //       });
//   //
//   //       function doSomeAsynchronousOperation()
//   //       {
//   //         return new Promise((resolve, reject) => {
//   //           fs.readdir(directory, function(error, file) {
//   //             if ( error ) {
//   //               reject( error );
//   //             } else {
//   //               resolve( file );
//   //             }
//   //           });
//   //         })
//   //       }
//   //
//   //       // function doSomeAsynchronousOperation()
//   //       // {
//   //       //   var promise = new Promise.Promise();
//   //       //   fs.readdir(directory, function(error, file) {
//   //       //     if ( error ) {
//   //       //       promise.reject( error );
//   //       //     } else {
//   //       //       promise.resolve( file );
//   //       //     }
//   //       //   });
//   //       //   return promise;
//   //       // }
//   //
//   //
//   //       // const walk = (dir, done) => {
//   //       //   console.log("\nWalk Function...");
//   //       //   let results = [];
//   //       //   fs.readdir(directory, function(error, list) {
//   //       //     console.log("\nInside directory: " + directory);
//   //       //     console.log("File: " + list);
//   //       //     if (error) return done(error);
//   //       //     let pending = list.length;
//   //       //     if (!pending) return done(null, results);
//   //       //     list.forEach(function(file) {
//   //       //       file = path.resolve(dir, file);
//   //       //       fs.stat(file, function(error, stat) {
//   //       //         if (stat && stat.isDirectory()) {
//   //       //           walk(file, function(error, res) {
//   //       //             results = results.concat(res);
//   //       //             if (!--pending) done(null, results);
//   //       //           });
//   //       //         } else {
//   //       //           results.push(file);
//   //       //           if (!--pending) done(null, results);
//   //       //         }
//   //       //       })
//   //       //     })
//   //       //   })
//   //       // }
//   //       // walk();
//   //
//   //       // walk(process.env.HOME, function(error, results) {
//   //       //   console.log("\nInside Walk");
//   //       //   if (error) console.log(error);
//   //       //   console.log(results);
//   //       // })
//   //
//   //       // const readAndDeleteFiles = async () => {
//   //       //   return await new Promise(async (resolve, reject) => {
//   //       //     // await fs.readdir(directory, (error, files) => {
//   //       //     await readdir(directory, (error, files) => {
//   //       //       console.log("\nNumber of files found in directory: " + directory + " are: " + files.length);
//   //       //       if (error) {
//   //       //         console.log(error);
//   //       //         reject(error);
//   //       //       };
//   //       //       if (files.length > 0) {
//   //       //         console.log("\nThe next files were found inside directory: " + directory);
//   //       //         console.log(files);
//   //       //         for (const file of files) {
//   //       //           if (!(file === null || file === undefined)) {
//   //       //             fs.unlink(path.join(directory, file), error => {
//   //       //               if (error) {
//   //       //                 console.log(error);
//   //       //                 reject(error);
//   //       //               };
//   //       //               console.log("\nRemoved file: " + file);
//   //       //               console.log("from directory: " + directory);
//   //       //               resolve(file);
//   //       //             });
//   //       //           };
//   //       //         };
//   //       //       };
//   //       //     });
//   //       //   });
//   //       // };
//   //       // // const results = await readAndDeleteFiles();
//   //       // return await readAndDeleteFiles();
//   //
//   //       // // return await Promise.all(
//   //       //   // readdirPromise(directory, (error, files) => {
//   //       //   await fs.readdir(directory, (error, files) => {
//   //       //     console.log("\nNumber of files found in directory: " + directory + " are: " + files.length);
//   //       //     if (error) {
//   //       //       console.log(error);
//   //       //       reject(error);
//   //       //     };
//   //       //     if (files.length > 0) {
//   //       //       console.log("\nThe next files were found inside directory: " + directory);
//   //       //       console.log(files);
//   //       //       for (const file of files) {
//   //       //         if (!(file === null || file === undefined)) {
//   //       //           fs.unlink(path.join(directory, file), error => {
//   //       //             if (error) {
//   //       //               console.log(error);
//   //       //               reject(error);
//   //       //             };
//   //       //             console.log("\nRemoved file: " + file);
//   //       //             console.log("from directory: " + directory);
//   //       //             resolve(file);
//   //       //           });
//   //       //         };
//   //       //       };
//   //       //     };
//   //       //   })
//   //       // // )
//   //
//   //
//   //
//   //       // // await fs.readdir(directory, (error, files) => {
//   //       // const readdirPromise = util.promisify(fs.readdir);
//   //       //
//   //       // // await fs.readdir(directory, (error, files) => {
//   //       // const getStuff = async () => {
//   //       //
//   //       //   return await readdirPromise(directory, (error, files) => {
//   //       //     console.log("\nNumber of files found in directory: " + directory + " are: " + files.length);
//   //       //     if (error) {
//   //       //       console.log(error);
//   //       //       reject(error);
//   //       //     };
//   //       //     if (files.length > 0) {
//   //       //       console.log("\nThe next files were found inside directory: " + directory);
//   //       //       console.log(files);
//   //       //       for (const file of files) {
//   //       //         if (!(file === null || file === undefined)) {
//   //       //           fs.unlink(path.join(directory, file), error => {
//   //       //             if (error) {
//   //       //               console.log(error);
//   //       //               reject(error);
//   //       //             };
//   //       //             console.log("\nRemoved file: " + file);
//   //       //             console.log("from directory: " + directory);
//   //       //             resolve(file);
//   //       //           });
//   //       //         };
//   //       //       };
//   //       //     };
//   //       //   });
//   //       //
//   //       // };
//   //       //
//   //       // getStuff().then(data => {
//   //       //   console.log(data);
//   //       // })
//   //
//   //
//   //       // // await fs.readdir(directory, (error, files) => {
//   //       // await fs.readdir(directory, (error, files) => {
//   //       //   console.log("\nNumber of files found in directory: " + directory + " are: " + files.length);
//   //       //   if (error) {
//   //       //     console.log(error);
//   //       //     // reject(error);
//   //       //   };
//   //       //   if (files.length > 0) {
//   //       //     console.log("\nThe next files were found inside directory: " + directory);
//   //       //     console.log(files);
//   //       //     for (const file of files) {
//   //       //       if (!(file === null || file === undefined)) {
//   //       //         fs.unlink(path.join(directory, file), error => {
//   //       //           if (error) {
//   //       //             console.log(error);
//   //       //             // reject(error);
//   //       //           };
//   //       //           console.log("\nRemoved file: " + file);
//   //       //           console.log("from directory: " + directory);
//   //       //           // resolve(file);
//   //       //         });
//   //       //       };
//   //       //     };
//   //       //   };
//   //       // });
//   //
//   //
//   //
//   //     })
//   //   );
//   // })();
//
//
//
//   // directories.map(async directory => {
//   //
//   //   console.log("\nMapping files inside directory: " + directory);
//   //
//   //   // fs.readdir(directory, (error, files) => {
//   //   await readdir(directory, (error, files) => {
//   //     console.log("\nNumber of files found in directory: " + directory + " are: " + files.length);
//   //     if (error) console.log(error);
//   //     if (files.length > 0) {
//   //       console.log("\nThe next files were found inside directory: " + directory);
//   //       console.log(files);
//   //       for (const file of files) {
//   //         if (!(file === null || file === undefined)) {
//   //           fs.unlink(path.join(directory, file), error => {
//   //             if (error) console.log(error);
//   //             console.log("\nRemoved file: " + file);
//   //             console.log("from directory: " + directory);
//   //           });
//   //         }
//   //       };
//   //     };
//   //   });
//   //
//   //   // // fs.readdir(directory, (error, files) => {
//   //   // const readAndDeleteFiles = () => {
//   //   //   new Promise((resolve, reject) => {
//   //   //     fs.readdir(directory, (error, files) => {
//   //   //       console.log("\nNumber of files found in directory: " + directory + " are: " + files.length);
//   //   //       if (error) {
//   //   //         console.log(error);
//   //   //         reject(error);
//   //   //       };
//   //   //       if (files.length > 0) {
//   //   //         console.log("\nThe next files were found inside directory: " + directory);
//   //   //         console.log(files);
//   //   //         for (const file of files) {
//   //   //           if (!(file === null || file === undefined)) {
//   //   //             fs.unlink(path.join(directory, file), error => {
//   //   //               if (error) {
//   //   //                 console.log(error);
//   //   //                 reject(error);
//   //   //               };
//   //   //               console.log("\nRemoved file: " + file);
//   //   //               console.log("from directory: " + directory);
//   //   //               resolve(file);
//   //   //             });
//   //   //           };
//   //   //         };
//   //   //       };
//   //   //     });
//   //   //   });
//   //   // };
//   //   //
//   //   // const results = await readAndDeleteFiles();
//   //
//   // });
// };
//
// module.exports.previousLogFiles = async () => {
//
//   console.log("\n>>>>> Removing Previous Log Files...");
//
//   if (verify.werePreviousFilesRemoved() !== true) {
//     console.log("\n[x][x][x][x][x] Previous Files Have NOT Been Deleted");
//     localMemory.setPreviousFilesRemovedToTrue();
//     let directories = [
//       logSettings.saveLocations.allLogs,
//       logSettings.saveLocations.logsByLogGroup,
//       logSettings.saveLocations.logsByLogSubgroup
//     ];
//     await removeAllFilesFromDirectories(directories);
//
//     // directories.map(directory => {
//     //   console.log("\nMapping Directories...");
//     //   console.log("\nDirectory is: " + directory);
//     //
//     //   // Next, read all files inside directory...
//     //
//     //   // SOLUTION 1
//     //   //
//     //   // const Promise = require('bluebird');
//     //   // const fsB = Promise.promisifyAll(require('fs'));
//     //   //
//     //   // fsB.readdir(directory, (error, files) => {
//     //   //   console.log("\nFiles inside directory are:");
//     //   //   console.log(files);
//     //   //   if (error) console.log(error);
//     //   //   if (files.length > 0) {
//     //   //     for (const file of files) {
//     //   //       if (!(file === null || file === undefined)) {
//     //   //         fs.unlink(path.join(directory, file), error => {
//     //   //           if (error) console.log(error);
//     //   //         });
//     //   //       }
//     //   //     };
//     //   //   };
//     //   // });
//     //
//     //   // SOLUTION 2
//     //
//     //   const fse = require('fs-extra');
//     //
//     //   fse.readdir(directory)
//     //     .then(files => {
//     //       console.log("\nFiles inside directory are:");
//     //       console.log(files);
//     //     });
//     //
//     //   // fse.readdir(directory, (error, files) => {
//     //   //   console.log("\nFiles inside directory are:");
//     //   //   console.log(files);
//     //   //   if (error) console.log(error);
//     //   //   if (files.length > 0) {
//     //   //     for (const file of files) {
//     //   //       if (!(file === null || file === undefined)) {
//     //   //         fs.unlink(path.join(directory, file), error => {
//     //   //           if (error) console.log(error);
//     //   //         });
//     //   //       }
//     //   //     };
//     //   //   };
//     //   // });
//     //
//     //
//     //
//     //
//     //
//     //   // fs.readdir(directory, (error, files) => {
//     //   //   if (error) console.log(error);
//     //   //   if (files.length > 0) {
//     //   //     for (const file of files) {
//     //   //       if (!(file === null || file === undefined)) {
//     //   //         fs.unlink(path.join(directory, file), error => {
//     //   //           if (error) console.log(error);
//     //   //         });
//     //   //       }
//     //   //     };
//     //   //   };
//     //   // });
//     //
//     // });
//
//     // directories.map(directory => {
//     //   fs.readdir(directory, (error, files) => {
//     //     if (error) console.log(error);
//     //     if (files.length > 0) {
//     //       for (const file of files) {
//     //         if (!(file === null || file === undefined)) {
//     //           fs.unlink(path.join(directory, file), error => {
//     //             if (error) console.log(error);
//     //           });
//     //         }
//     //       };
//     //     };
//     //   });
//     // });
//
//   } else {
//     console.log("\n[x][x][x][x][x] Previous Files Have Already Been Deleted");
//   };
//
//   // console.log("\n [-][-][-] removePreviousLogFiles() Function");
//   //
//   // let arePreviousLogFilesRemoved = store.get("are-previous-log-files-removed");
//   // let logsOnlyActive = store.get("logs-only-active");
//   // if (logSettings.removePreviousLogFiles === true
//   // && arePreviousLogFilesRemoved !== true
//   // && logsOnlyActive !== true) {
//   //   console.log("\n• removeFiles settings is true");
//   //   console.log("• all files have already been removed once");
//   //   console.log("• logsOnly is not active");
//   //   store.set("are-previous-log-files-removed", true);
//   //
//   //   let directories = [
//   //     logSettings.saveLocations.allLogs,
//   //     logSettings.saveLocations.logsByLogGroup,
//   //     logSettings.saveLocations.logsByLogSubgroup
//   //   ];
//   //   removeAllFilesFromDirectories(directories);
//   // };
//
// };
//
// module.exports.groupAndSubgroupFiles = () => {
//
//   console.log("\nRemoving Log Group and Subgroup Files...");
//
//   // check if groupAndSubgroupFiles were already removed...
//   if (verify.wereLogGroupAndLogSubgroupFilesRemoved() !== true) {
//     localMemory.setLogGroupAndLogSubgroupFilesRemovedToTrue();
//   }
//   let directories = [
//     logSettings.saveLocations.logsByLogGroup,
//     logSettings.saveLocations.logsByLogSubgroup
//   ];
//   removeAllFilesFromDirectories(directories);
//
//   // directories.map(directory => {
//   //   fs.readdir(directory, (error, files) => {
//   //     if (error) console.log(error);
//   //     if (files.length > 0) {
//   //       for (const file of files) {
//   //         if (!(file === null || file === undefined)) {
//   //           fs.unlink(path.join(directory, file), error => {
//   //             if (error) console.log(error);
//   //           });
//   //         }
//   //       };
//   //     };
//   //   });
//   // });
//
//   // let logsOnlyCount = store.get("logs-only-count");
//   // console.log("\n• LogsOnly count is: " + logsOnlyCount);
//   // if (logsOnlyCount === 1) {
//   //   console.log("LogsOnly count is 1 we will delete all logs by group or sub");
//   //   let directories = [
//   //     logSettings.saveLocations.logsByLogGroup,
//   //     logSettings.saveLocations.logsByLogSubgroup
//   //   ];
//   //   removeAllFilesFromDirectories(directories);
//   // };
//
// };
