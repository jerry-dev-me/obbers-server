/*
  • restiction types:
  "default"
  "selfOnly"
  "followingOnly"
  "valueMustBeFoundInFields"
  "valueMustBeFoundInAnyFields"
*/
const h = require("../../../helpers")
const u = require("../../../../utils")
const e = require("../../../errors")
const crud = require("../../crud")
const verifyDoc = require("../../verifyDoc")
const verifyUser = require("../../verifyUser")
const validateFields = require("../../validateFields")

const defaultRestriction = async (userId, allRefs) => {
  let restriction = true

  // if the data to read is user, just make sure reader is not blocked
  // if the data to read is a doc, make sure user can read private user

  await Promise.all(
    allRefs.refs.map(async ref => {
      const canUserReadCreator = await verifyDoc.canUserReadCreator[
        ref.refModel
      ].checkId(userId, ref.refId)
      if (canUserReadCreator === false) restriction = false
    })
  )

  // console.log("\n ---------------------------------------------");
  // console.log("... verifying restriction ...");
  // console.log("restriction: defaultRestriction");
  //
  // console.log("\n restriction pass: " + restriction);
  // console.log("\n ---------------------------------------------");

  if (restriction === false) return false // return new errors.CannotReadUser();
  return restriction
}

const selfOnly = async (userId, docRefs, allRefs) => {
  let restriction = true

  // map docRefs
  // if userId is found at docRefs
  //

  const creator = docRefs.docInfo.creator
  const isSameUser = verifyUser.isSameUser(userId, creator)
  if (isSameUser === false) throw new e.UserIsNotDocCreator()

  // await Promise.all(
  //   docRefs.refs.map(async ref => {
  //     const isUserIdCreator = await verifyDoc.isUserIdCreator[
  //       ref.refModel
  //     ].checkId(userId, ref.refId);
  //     if (isUserIdCreator === false) restriction = false;
  //   })
  // );

  // allRefs - docRefs ... subtract docRefs to allRefs
  // allRefs = u.subtractObjectsFromArrays.byObjProp(allRefs.refs, docRefs.refs, "id");

  // console.log("\n docRefs");
  // console.log(docRefs);
  //
  // console.log("\n allRefs");
  // console.log(allRefs);

  await Promise.all(
    allRefs.refs.map(async ref => {
      const canUserReadCreator = await verifyDoc.canUserReadCreator[
        ref.refModel
      ].checkId(userId, ref.refId)
      if (canUserReadCreator === false) throw new e.CanUserReadUserIsFalse()
      // throw new e.CannotReadUser();
    })
  )

  // console.log("\n ---------------------------------------------");
  // console.log("... verifying restriction ...");
  // console.log("restriction: selfOnly");
  //
  // console.log("\n restriction pass: " + restriction);
  // console.log("\n ---------------------------------------------");

  if (restriction === false) return false // return new errors.SelfOnly();
  return restriction
}

const followingOnly = async (userId, docRefs, allRefs) => {
  let restriction = true

  await Promise.all(
    docRefs.refs.map(async ref => {
      const isUserFollowingCreator = await verifyDoc.isUserFollowingCreator[
        ref.refModel
      ].checkId(userId, ref.refId)

      console.log("\n isUserFollowingCreator: " + isUserFollowingCreator)
      console.log(ref)

      if (isUserFollowingCreator === false) restriction = false
    })
  )

  // // allRefs - docRefs ... subtract docRefs to allRefs
  // allRefs = u.subtractObjectsFromArrays.byObjProp(allRefs.refs, docRefs.refs, "id");
  //
  // await Promise.all(
  //   allRefs.refs.map(async ref => {
  //     const canUserReadCreator = await verifyDoc.canUserReadCreator[
  //       ref.refModel
  //     ].checkId(userId, ref.refId);
  //     if (canUserReadCreator === false) restriction = false;
  //   })
  // );

  // console.log("\n ---------------------------------------------");
  // console.log("... verifying restriction ...");
  // console.log("restriction: followingOnly");
  //
  // console.log("\n restriction pass: " + restriction);
  // console.log("\n ---------------------------------------------");

  if (restriction === false) return false // return new errors.FollowingOnly();
  return restriction
}

const valueMustBeFoundInFields = async (
  userId,
  docRefs,
  allRefs,
  valuesAndFields
) => {
  let restriction = true
  await Promise.all(
    docRefs.refs.map(async ref => {
      valuesAndFields.fields.map(async field => {
        const isValueFoundInField = await verifyDoc.isValueFoundInField[
          ref.refModel
        ].checkId(valuesAndFields.value, field, ref.refId)
        if (isValueFoundInField === false) return false // return new errors.SelfOnly
      })
    })
  )

  // allRefs - docRefs ... subtract docRefs to allRefs
  allRefs = u.subtractObjectsFromArrays.byObjProp(
    allRefs.refs,
    docRefs.refs,
    "id"
  )

  await Promise.all(
    allRefs.refs.map(async ref => {
      const canUserReadCreator = await verifyDoc.canUserReadCreator[
        ref.refModel
      ].checkId(userId, ref.refId)
      if (canUserReadCreator === false) restriction = false
    })
  )

  // console.log("\n ---------------------------------------------");
  // console.log("... verifying restriction ...");
  // console.log("restriction: valueMustBeFoundInFields");
  //
  // console.log("\n restriction pass: " + restriction);
  // console.log("\n ---------------------------------------------");

  if (restriction === false) return false // return new errors.FollowingOnly();
  return restriction
}

const valueMustBeFoundInAnyFields = async (
  userId,
  docRefs,
  allRefs,
  valuesAndFields
) => {
  let restriction = true

  await Promise.all(
    docRefs.refs.map(async ref => {
      valuesAndFields.fields.map(async field => {
        const isValueFoundInField = await verifyDoc.isValueFoundInField[
          ref.refModel
        ].checkId(valuesAndFields.value, field, ref.refId)
        if (isValueFoundInField === true) return true
      })
    })
  )

  // allRefs - docRefs ... subtract docRefs to allRefs
  allRefs = u.subtractObjectsFromArrays.byObjProp(
    allRefs.refs,
    docRefs.refs,
    "id"
  )

  await Promise.all(
    allRefs.refs.map(async ref => {
      const canUserReadCreator = await verifyDoc.canUserReadCreator[
        ref.refModel
      ].checkId(userId, ref.refId)
      if (canUserReadCreator === false) restriction = false
    })
  )

  // console.log("\n ---------------------------------------------");
  // console.log("... verifying restriction ...");
  // console.log("restriction: valueMustBeFoundInAnyFields");
  //
  // console.log("\n restriction pass: " + restriction);
  // console.log("\n ---------------------------------------------");

  if (restriction !== true) return false // return new errors.FollowingOnly();
  return restriction
}

const selfOnlyAllRefs = async (userId, allRefs) => {
  let restriction = true

  await Promise.all(
    allRefs.refs.map(async ref => {
      const isUserIdCreator = await verifyDoc.isUserIdCreator[
        ref.refModel
      ].checkId(userId, ref.refId)
      if (isUserIdCreator === false) restriction = false
    })
  )

  // console.log("\n ---------------------------------------------");
  // console.log("... verifying restriction ...");
  // console.log("restriction: selfOnlyAllRefs");
  //
  // console.log("\n restriction pass: " + restriction);
  // console.log("\n ---------------------------------------------");

  if (restriction === false) return false // return new errors.SelfOnly();
  return restriction
}

const followingOnlyAllRefs = async (userId, allRefs) => {
  let restriction = true

  await Promise.all(
    allRefs.refs.map(async ref => {
      const isUserFollowingCreator = await verifyDoc.isUserFollowingCreator[
        ref.refModel
      ].checkId(userId, ref.refId)
      if (isUserFollowingCreator === false) restriction = false
    })
  )

  // console.log("\n ---------------------------------------------");
  // console.log("... verifying restriction ...");
  // console.log("restriction: followingOnlyAllRefs");
  //
  // console.log("\n restriction pass: " + restriction);
  // console.log("\n ---------------------------------------------");

  if (restriction === false) return false // return new errors.FollowingOnly();
  return restriction
}

const valueMustBeFoundInFieldsAllRefs = async (
  userId,
  allRefs,
  valuesAndFields
) => {
  let restriction = true

  await Promise.all(
    allRefs.refs.map(async ref => {
      valuesAndFields.fields.map(async field => {
        const isValueFoundInField = await verifyDoc.isValueFoundInField[
          ref.refModel
        ].checkId(valuesAndFields.value, field, ref.refId)
        if (isValueFoundInField === false) return false // return new errors.SelfOnly
      })
    })
  )

  // console.log("\n ---------------------------------------------");
  // console.log("... verifying restriction ...");
  // console.log("restriction: valueMustBeFoundInFieldsAllRefs");
  //
  // console.log("\n restriction pass: " + restriction);
  // console.log("\n ---------------------------------------------");

  if (restriction === false) return false // return new errors.FollowingOnly();
  return restriction
}

const valueMustBeFoundInAnyFieldsAllRefs = async (
  userId,
  allRefs,
  valuesAndFields
) => {
  let restriction = true

  await Promise.all(
    allRefs.refs.map(async ref => {
      valuesAndFields.fields.map(async field => {
        const isValueFoundInField = await verifyDoc.isValueFoundInField[
          ref.refModel
        ].checkId(valuesAndFields.value, field, ref.refId)
        if (isValueFoundInField === true) return true
      })
    })
  )
  // console.log("\n ---------------------------------------------");
  // console.log("... verifying restriction ...");
  // console.log("restriction: valueMustBeFoundInAnyFieldsAllRefs");
  //
  // console.log("\n restriction pass: " + restriction);
  // console.log("\n ---------------------------------------------");

  if (restriction !== true) return false // return new errors.FollowingOnly();
  return restriction
}

module.exports = {
  defaultRestriction: async function(userId, allRefs) {
    return await defaultRestriction(userId, allRefs)
  },
  selfOnly: async function(userId, docRefs, allRefs) {
    return await selfOnly(userId, docRefs, allRefs)
  },
  followingOnly: async function(userId, docRefs, allRefs) {
    return await followingOnly(userId, docRefs, allRefs)
  },
  valueMustBeFoundInFields: async function(
    userId,
    docRefs,
    allRefs,
    valuesAndFields
  ) {
    return await valueMustBeFoundInFields(
      userId,
      docRefs,
      allRefs,
      valuesAndFields
    )
  },
  valueMustBeFoundInAnyFields: async function(
    userId,
    docRefs,
    allRefs,
    valuesAndFields
  ) {
    return await valueMustBeFoundInAnyFields(
      userId,
      docRefs,
      allRefs,
      valuesAndFields
    )
  },
  selfOnlyAllRefs: async function(userId, allRefs) {
    return await selfOnlyAllRefs(userId, allRefs)
  },
  followingOnlyAllRefs: async function(userId, allRefs) {
    return await followingOnlyAllRefs(userId, allRefs)
  },
  valueMustBeFoundInFieldsAllRefs: async function(
    userId,
    allRefs,
    valuesAndFields
  ) {
    return await valueMustBeFoundInFieldsAllRefs(
      userId,
      allRefs,
      valuesAndFields
    )
  },
  valueMustBeFoundInAnyFieldsAllRefs: async function(
    userId,
    allRefs,
    valuesAndFields
  ) {
    return await valueMustBeFoundInAnyFieldsAllRefs(
      userId,
      allRefs,
      valuesAndFields
    )
  },
}
