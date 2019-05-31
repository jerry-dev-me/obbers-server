const logger = require("../../../lib/logger");
const lG = "QUERIES-VALIDATE-OP"; // logGroup
const lS = "DELETE"; // logSubgroup

const u = require("../../../utils");
const h = require("../../helpers");
const e = require("../../errors/queries/validateOperation");
const crud = require("../crud");
const verifyDoc = require("../verifyDoc");
const verifyUser = require("../verifyUser");

const validateUser = require("./validations/validateUser");
const validateRefs = require("./validations/validateRefs");

let validationResults = {};
validationResults["docsById"] = {};

const validationComplete = () => validationResults;
