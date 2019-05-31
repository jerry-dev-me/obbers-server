#!/usr/bin/env node
const fs = require("fs");
const async = require('async');

const config = require('../config');
const logSettings = require('../config').settings;

module.exports.allLogs = () => {
  // const logsFile = logSettings.saveLocations.allLogs + "logs.json";
  // const logsFile = logSettings.saveLocations.allLogs + "logs.log";

  console.log("\n HELLOOOO ");

  // fs.readFile(logsFile, (error, content) => {
  //   if(error) {
  //     console.log("\n[x] There was an error when reading the logs.json file:");
  //     console.log(error);
  //   };
  //
  //   console.log("\n---------------------------------------------");
  //   console.log("[…] Reading logs...");
  //   console.log("---------------------------------------------");
  //
  //   // console.log(typeof content);
  //
  //   // content.map(i => {
  //   //   console.log("\ni is:");
  //   //   console.log(i);
  //   // })
  //
  //   let parsedContent = JSON.parse(content);
  //
  //   console.log(typeof parsedContent);
  //
  //   // parsedContent.map(object => {
  //   //   console.log(object);
  //   //   // console.log("\n");
  //   //   // console.log("• " + object.title);
  //   //   // console.log("from function: " + object.method);
  //   //   // console.log("found at: " + object.file);
  //   //   // if (!(object.message === null || object.message === undefined)) {
  //   //   //   console.log(object.message);
  //   //   // };
  //   //   // if (!(object.data === null || object.data === undefined)) {
  //   //   //   console.log("[√] " + object.data);
  //   //   //   console.log(object.value);
  //   //   // };
  //   // });
  // });

  // fs.readFile(logsFile, 'utf8', function(err, data) {
  //   console.log("\ndata is:");
  //   console.log(typeof data);
  //   console.log(data);
  //   var content = data.split('}');
  //   async.map(content, function (item, callback) {
  //     callback(null, JSON.parse(item));
  //   }, function (err, content) {
  //     console.log(content);
  //   });
  // });

  // THIS WAS THE LAST WORKING BLOCK
  // fs.readFile(logsFile, 'utf8', function(error, data) {
  //   var records = data.split('\n').map(function (record) {
  //     let parsedRecord = JSON.parse(record);
  //     console.log("\n");
  //     if (parsedRecord.data === "error") {
  //       console.log("[x][x][x][x][x][x][x][x][x][x][x][x][x][x][x]");
  //     };
  //     // console.log(parsedRecord);
  //     console.log(`[•] ${parsedRecord.title}`);
  //     console.log(`[¬] "${parsedRecord.file}"`);
  //     // console.log(`¬¬ ${parsedRecord.parentFile}`);
  //     console.log(`[f] ${JSON.stringify(parsedRecord.function)}`);
  //     console.log(`[…] ${parsedRecord.message}`);
  //     console.log(`[¡] ${parsedRecord.data}`);
  //     // console.log(`[»] ${JSON.stringify(parsedRecord.value)}`);
  //     console.log(parsedRecord.value);
  //     // console.log(` ${parsedRecord.createdAt}`);
  //   })
  // });

};
