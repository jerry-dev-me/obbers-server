// /**
//  *
//  */
//
// /*
// --------------------------------------------------------------------------------
//   • operations:
//
//   - create
//   - read
//   - write
// --------------------------------------------------------------------------------
//   • refTypes:
//
//   - fields
//   - doc
//   - refObject
//
//   examples
//
//   refType: "fields"
//
//   const validateOperation = require("../validateOperation");
//   const validation = await validateOperation({
//     info: {
//       userId: userId,
//       operation: "create", // only applies to operation "create"
//       model: model,
//       adminOnly: false
//     },
//     references: [{
//       refType: "fields",
//       value: {},
//       restriction: { type: type, allRefs: false }
//     }]
//   });
//
//   refType: "doc"
//
//   const validateOperation = require("../validateOperation");
//   const validation = await validateOperation({
//     info: {
//       userId: userId,
//       operation: "read", // only applies to operations "read" or "write"
//       model: model,
//       adminOnly: false
//     },
//     references: [{
//       refType: "doc",
//       value: {},
//       restriction: { type: type, allRefs: false }
//     }]
//   });
//
//   refType: "refObject"
//
//   const validateOperation = require("../validateOperation");
//   const validation = await validateOperation({
//     info: {
//       userId: userId,
//       operation: "read", // only applies to operations "read" or "write"
//       model: model,
//       adminOnly: false
//     },
//     references: [{
//       refType: "refObject",
//       value: { model, id},
//       restriction: { type: type, allRefs: false }
//     }]
//   });
// --------------------------------------------------------------------------------
//   • restiction types:
//
//   - "adminOnly"
//   - "default"
//   - "selfOnly"
//   - "followingOnly"
//   - "valueMustBeFoundInFields"
//   - "valueMustBeFoundInAnyFields"
//
//   examples
//
//   "adminOnly"
//   applies to all operations ("create", "read", "write"):
//   configured at "info" by setting it to true or false
//   if not specified then by default adminOnly will be set to false
//   if adminOnly is specified and set to true there is no need to pass the
//   references object,
//
//   const validateOperation = require("../validateOperation");
//   const validation = await validateOperation({
//     info: {
//       userId: userId,
//       operation: operation, // "create", "read" or "write"
//       model: model,
//       adminOnly: true
//     },
//     references: [{
//       refType: "refObject",
//       value: { model, id},
//       restriction: { type: type, allRefs: false }
//     }]
//   });
//
//   *UPDATE
//   *** if restriction.allRefs is undefined then set allRefs to false
//
// --------------------------------------------------------------------------------
//
// PARENT REFERERNECS.... COMMENT < POST < USER
// CHILDREN REFERENCES... COMMENT > RESPONSES || COMMENT > LIKES
//
// FOR THE DOc TO RETURN, CHECK IF HAS CHILDREN IDS...
// MAP ALL CHILDREN IDS TO SEE WHAT REFIDS THE USER READER CAN READ...
// ADD TOSE TO A NEW ARRAY AND RETURN THOSE IN THE DOc OBJECT...
//
// */
//
// const logger = require("../../../lib/logger");
// const u = require("../../../utils");
// const h = require("../../helpers");
// const e = require("../../errors/queries/validateOperation");
// const crud = require("../crud");
// const verifyDoc = require("../verifyDoc");
// const verifyUser = require("../verifyUser");
// const validateFields = require("../validateFields");
// const restrictions = require("./restrictions");
//
// const lG = "QUERIES";
// const lS = "UPDATE-USER";
//
// module.exports = async o => {
//   let validationResults = {};
//   validationResults.docsById = {};
//
//   let userDoc;
//   let refDoc;
//   let refsDocs;
//
//   if (o && o.info.operation === "create" && o.info.model === "user") {
//     const validFields = await validateFields.user(ref.value);
//     if (validFields instanceof Error) return validFields;
//     validationResults["validFields"] = validFields;
//     return validationResults;
//   }
//
//   userDoc = await verifyDoc.exists.user.checkId(o.info.userId);
//   logger.log(lG, lS, null, { userDoc });
//   if (userDoc instanceof Error) return userDoc;
//
//   // validationResults[userDoc] = userDoc;
//   validationResults.docsById[o.info.userId] = userDoc;
//
//   if (o && o.info && o.info.adminOnly === true) {
//     const isUserAdmin = verifyUser.isPermissions.admin.checkDoc(
//       userDoc
//     );
//     if (isUserAdmin === false) throw new e.UserIsNotAdmin();
//   } else {
//     if (o && o.info && o.info.operation === "create") {
//       const canUserWrite = verifyUser.canUserWrite.checkDoc(userDoc);
//       if (canUserWrite === false) throw new e.UserCannotWrite();
//     }
//     if (o && o.info && o.info.operation === "read") {
//       const canUserRead = verifyUser.canUserRead.checkDoc(userDoc);
//       if (canUserRead === false) throw new e.UserCannotRead();
//     }
//     if (o && o.info && o.info.operation === "write") {
//       const canUserWrite = verifyUser.canUserWrite.checkDoc(userDoc);
//       if (canUserWrite === false) throw new e.UserCannotWrite();
//     }
//   }
//
//   if (
//     o.info.userId &&
//     o.info.operation &&
//     (!o.info.model && !o.info.adminOnly && !o.references)
//   )
//     return validationResults;
//
//   let restrictionsPass;
//
//   if (o && o.references && o.references.length > 0) {
//     await Promise.all(
//       o.references.map(async ref => {
//         let userId = o.info.userId;
//
//         let refType = ref.refType;
//         let refValue = ref.value;
//
//         let refRestriction;
//         let refRestrictionAllRefs;
//
//         if (o.info.adminOnly === false) {
//           if (ref && ref.restriction && ref.restriction.type) {
//             refRestriction = ref.restriction.type;
//           } else {
//             refRestriction = "default";
//           }
//           if (ref && ref.restriction && ref.restriction.allRefs) {
//             refRestrictionAllRefs = ref.restriction.allRefs;
//           } else {
//             refRestrictionAllRefs = false;
//           }
//         }
//
//         let docRefs;
//         let allRefs;
//
//         // pull doc refs and all deep refs based on reference type
//
//         if (refType === "fields") {
//           const validFields = await validateFields[ref.refModel](ref.value);
//           if (validFields instanceof Error) return validFields;
//           validationResults["validFields"] = validFields;
//         }
//
//         if (refType === "fields" || refType === "doc") {
//           if (
//             !(o.info && o.info.adminOnly) ||
//             (o.info && o.info.adminOnly === false)
//           ) {
//             const isUserIdCreator = verifyDoc.isUserIdCreator[
//               ref.refModel
//             ].checkDoc(userId, ref.value);
//             if (isUserIdCreator === false)
//               throw new e.UserIsNotDocCreator();
//           }
//
//           docRefs = verifyDoc.getDocRefs[
//             ref.refModel
//           ].checkDoc(ref.value);
//           allRefs = await verifyDoc.getAllRefs[ref.refModel].checkDoc(
//             ref.value
//           );
//           if (docRefs === false || docRefs instanceof Error)
//             return false; // some refs do not exist
//           if (allRefs === false || allRefs instanceof Error) return false; // some allRefs do not exist
//         }
//
//         if (refType === "refObject") {
//           const refDocExists = await verifyDoc.exists[
//             refValue.refModel
//           ].checkId(refValue.refId);
//           if (refDocExists === false)
//             throw new e.DocDoesNotExist(refValue.refModel);
//           validationResults.docsById[refValue.refId] = refDocExists;
//
//           docRefs = await verifyDoc.getDocRefs[
//             ref.value.refModel
//           ].checkId(ref.value.refId);
//           allRefs = await verifyDoc.getAllRefs[ref.value.refModel].checkId(
//             ref.value.refId
//           );
//           if (docRefs === false || docRefs instanceof Error)
//             return false; // some refs do not exist
//           if (allRefs === false || allRefs instanceof Error) return false; // some allRefs do not exist
//         }
//
//         await Promise.all(
//           docRefs.refs.map(async ref => {
//             const refDocExists = await verifyDoc.exists[
//               ref.refModel
//             ].checkId(ref.refId);
//             if (refDocExists === false)
//               throw new e.DocDoesNotExist(ref.refModel);
//             validationResults.docsById[ref.refId] = refDocExists;
//           })
//         );
//         await Promise.all(
//           allRefs.refs.map(async ref => {
//             const refDocExists = await verifyDoc.exists[
//               ref.refModel
//             ].checkId(ref.refId);
//             if (refDocExists === false)
//               throw new e.DocDoesNotExist(ref.refModel);
//             validationResults.docsById[ref.refId] = refDocExists;
//           })
//         );
//
//         if (o && o.info && o.info.adminOnly === true) return;
//
//         let valueAndFields;
//         if (refRestriction && refRestriction.valueMustBeFoundInFields) {
//           valueAndFields = ref.valueMustBeFoundInFields;
//         }
//         if (refRestriction && refRestriction.valueMustBeFoundInAnyFields) {
//           valueAndFields = ref.valueMustBeFoundInAnyFields;
//         }
//
//         if (refRestriction === "valueMustBeFoundInFields") {
//           let value = refRestriction.value;
//           let fields = refRestriction.fields;
//           valueAndFields = { value, fields };
//         }
//         if (refRestriction === "valueMustBeFoundInAnyFields") {
//           let value = refRestriction.value;
//           let fields = refRestriction.fields;
//           valueAndFields = { value, fields };
//         }
//
//         const validate = await validateRestriction(
//           userId,
//           refRestriction,
//           refRestrictionAllRefs,
//           docRefs,
//           allRefs,
//           valueAndFields
//         );
//
//         if (validate === false) {
//           restrictionsPass = false;
//           return false;
//         }
//
//         if (validate instanceof Error) {
//           restrictionsPass = validate;
//           return validate;
//         }
//       })
//     );
//   }
//
//   if (restrictionsPass === false) {
//     return false;
//   }
//   if (restrictionsPass instanceof Error) {
//     return restrictionsPass;
//   }
//
//   return validationResults;
// };
//
// const validateRestriction = async (
//   userId,
//   refRestriction,
//   refRestrictionAllRefs,
//   docRefs,
//   allRefs,
//   valueAndFields
// ) => {
//   // console.log("\n ---------------------------------------------");
//   // console.log("Operation Info:");
//   //
//   // console.log("\n docRefs");
//   // console.log(docRefs);
//   //
//   // console.log("\n allRefs");
//   // console.log(allRefs);
//   //
//   // console.log("\n refRestriction: " + refRestriction);
//   // console.log("\n refRestriction apply allRefs: " + refRestrictionAllRefs);
//   //
//   // console.log("\n ---------------------------------------------");
//
//   switch (refRestriction) {
//     case "default":
//       return await restrictions.defaultRestriction(userId, allRefs);
//       break;
//     case "selfOnly":
//       if (refRestrictionAllRefs === true) {
//         return await restrictions.selfOnlyAllRefs(userId, allRefs);
//       }
//       return await restrictions.selfOnly(userId, docRefs, allRefs);
//       break;
//     case "followingOnly":
//       if (refRestrictionAllRefs === true) {
//         return await restrictions.followingOnlyAllRefs(userId, allRefs);
//       }
//       return await restrictions.followingOnly(userId, docRefs, allRefs);
//       break;
//     case "valueFoundInFields":
//       if (refRestrictionAllRefs === true) {
//         return await restrictions.valueFoundInFieldsAllRefs(
//           userId,
//           allRefs,
//           valueAndFields
//         );
//       }
//       return await restrictions.valueFoundInFields(
//         userId,
//         docRefs,
//         allRefs,
//         valueAndFields
//       );
//       break;
//     case "valueFoundInAnyFields":
//       if (refRestrictionAllRefs === true) {
//         return await restrictions.valueFoundInAnyFieldsAllRefs(
//           userId,
//           allRefs,
//           valueAndFields
//         );
//       }
//       return await restrictions.valueFoundInAnyFields(
//         userId,
//         docRefs,
//         allRefs,
//         valueAndFields
//       );
//       break;
//     default:
//       return;
//   }
// };

module.exports = {
  create: require("./create"),
  read: require("./read"),
  update: require("./update"),
  delete: require("./delete"),
  validateUser: require("./validations/validateUser"),
}
