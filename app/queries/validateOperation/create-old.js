// userId
// references [{}]
// restrictions

// reference
// { refModel, refId } restriction
// ... make sure writer can write all docs not if user can read user...
// ... make sure read can read all docs not if user can read user...

let validationResults = {};
validationResults["docsById"] = {};

////////////////////////////////////////////////////////////////////////////////
// CREATE VALIDATION
const validation = await validateOperation.create(writerId, fields, [
  { refModel: "response", refId: responseId, restriction: "default" }
]);

// user is active
// user has read/write permissions
// user can read all parent docs
// if user cannot read child docs, create with no child doc ref

// validate user...
// validate fields...
// validate references... with their restriction...
// if any reference fails validation, then return e.HandleValidateOperationError(err)or
// if all references pass restriction, then return all docs by id

module.exports.create = async (writerId, model, fields, references) => {
  const canUserWrite = verifyUser.canUserWrite.checkDoc(userDoc);
  if (canUserWrite === false) throw new e.UserCannotWrite();

  if (model === "user") {
    const validFields = await validateFields.user(fields);
    if (validFields instanceof Error) return validFields;
    validationResults["validFields"] = validFields;
    // return validationResults;
    return validationComplete();
  }

  const userDoc = await verifyDoc.exists.user.checkId(writerId);
  if (userDoc instanceof Error) return userDoc;
  validationResults.docsById[writerId] = userDoc;

  const validFields = await validateFields[model](fields);
  if (validFields instanceof Error) return validFields;
  validationResults["validFields"] = validFields;

  const isUserIdCreator = verifyDoc.isUserIdCreator[model].checkDoc(
    writerId,
    fields
  );
  if (isUserIdCreator === false) throw new e.UserIsNotDocCreator();

  docRefs = verifyDoc.getDocRefs[model].checkDoc(fields);
  allRefs = await verifyDoc.getAllRefs[model].checkDoc(fields);
  if (docRefs === false || docRefs instanceof Error) return docRefs;
  if (allRefs === false || allRefs instanceof Error) return allRefs;

  if (references && references.length > 0) {
    await validateReferences(references);
  }

  return validationComplete();
};
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// READ VALIDATION
const validation = await validateOperation.read(writerId, [
  { refModel: "response", refId: responseId, restriction: "default" }
]);

// user is active or suspended
// user has read permissions
// user can read all parent docs

// validate user...
// validate references... with their restriction...
// if any reference fails validation, then return e.HandleValidateOperationError(err)or
// if all references pass restriction, then return all docs by id

module.exports.read = async (readerId, references) => {
  const userDoc = await verifyDoc.exists.user.checkId(readerId);
  if (userDoc instanceof Error) return userDoc;
  validationResults.docsById[readerId] = userDoc;

  const canUserRead = verifyUser.canUserRead.checkDoc(userDoc);
  if (canUserRead === false) throw new e.UserCannotRead();

  if (references && references.length > 0) {
    await validateReferences(references);
  }

  return validationComplete();
};
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// UPDATE VALIDATION
const validation = await validateOperation.update(writerId, [
  { refModel: "response", refId: responseId, restriction: "default" }
]);

// user is active
// user has read/write permissions
// user is creator of doc
// user can read all parent docs

// validate user...
// validate references... with their restriction...
// if any reference fails validation, then return e.HandleValidateOperationError(err)or
// if all references pass restriction, then return all docs by id

module.exports.update = async (writerId, newContent. references) => {
  const userDoc = await verifyDoc.exists.user.checkId(writerId);
  if (userDoc instanceof Error) return userDoc;
  validationResults.docsById[writerId] = userDoc;

  const canUserWrite = verifyUser.canUserWrite.checkDoc(userDoc);
  if (canUserWrite === false) throw new e.UserCannotWrite();

  const canUserUpdate = await verifyDoc
    .canUserUpdate[model]
    .checkId(refId);

  // validate new content with model field requirements

  if (references && references.length > 0) {
    await validateReferences(references);
  }

  return validationComplete();
};
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// DELETE VALIDATION
const validation = await validateOperation.delete(writerId, [
  { refModel: "response", refId: responseId, restriction: "default" }
]);

// user is active
// user has read/write permissions
// user is creator of doc
// user is creator of parent docs
// user can read all parent docs

// validate user...
// validate references... with their restriction...
// if any reference fails validation, then return e.HandleValidateOperationError(err)or
// if all references pass restriction, then return all docs by id

module.exports.delete = async (writerId, references) => {
  const userDoc = await verifyDoc.exists.user.checkId(writerId);
  if (userDoc instanceof Error) return userDoc;
  validationResults.docsById[writerId] = userDoc;

  const canUserWrite = verifyUser.canUserWrite.checkDoc(userDoc);
  if (canUserWrite === false) throw new e.UserCannotWrite();

  if (references && references.length > 0) {
    await validateReferences(references);
  }

  return validationComplete();
};
////////////////////////////////////////////////////////////////////////////////

// get doc references and all parent references
// validate references and all parent references, exist?
// verify reference restriction, make sure restiction is valid

const validateReferences = async references => {
  if (!(references && references.length > 0)) return null;

  return await Promise.all(
    references.map(async reference => {
      const { refModel, refId, restriction } = reference;

      let restrictionData;
      if (reference && reference.restrictionData) {
        restrictionData = reference.restrictionData;
      }

      // for each reference:
      // - grab refModel and refId... make sure doc exists and..
      // - grab all refs and make sure they exist..
      // then send docRefs and allRefs to the restriction verifier...

      // const docExists = await verifyDoc.exists[refModel].checkId(refid)
      // const docRefs;
      // const allRefs;
      // validateRestriction[restriction](
      //   restrictionData,
      //   docRefs,
      //   allRefs
      // );

      const refDoc = await verifyDoc
        .exists[refModel]
        .checkId(refId);

      if (refDoc === false) throw new e.DocDoesNotExist(refModel);
      validationResults.docsById[refId] = refDoc;

      const docRefs = await verifyDoc
        .getDocRefs[refModel]
        .checkId(refId);

      if (docRefs === false || docRefs instanceof Error)
        return false; // some refs do not exist

      const allRefs = await verifyDoc
        .getAllRefs[refModel]
        .checkId(refId);

      if (allRefs === false || allRefs instanceof Error)
        return false; // some allRefs do not exist

      const validation = await validateRestriction[restriction](
        restrictionData,
        docRefs,
        allRefs
      );

      if (validation === false || validation instanceof Error)
        return false; // restriction validation failed

    })
  )
}

const validateRestriction = {
  "default": (async function(restrictionData, docRefs, allRefs) => {
    // we have the doc refs...
    // make sure user can read doc creator, docRefs.userId

    // for the rest, allRefs..
    // make sure user can read/write doc...
    allRefs.map(ref => {

    })
  })(),
  "adminOnly": (async function(restrictionData, docRefs, allRefs) => {

  })(),
  "selfOnly": (async function(restrictionData, docRefs, allRefs) => {

  })(),
  "selfOnly-all": (async function(restrictionData, docRefs, allRefs) => {

  })(),
  "followingOnly": (async function(restrictionData, docRefs, allRefs) => {

  })(),
  "followingOnly-all": (async function(restrictionData, docRefs, allRefs) => {

  })(),
  "valueFoundInField": (async function(restrictionData, docRefs, allRefs) => {

  })(),
  "valueFoundInFields": (async function(restrictionData, docRefs, allRefs) => {

  })(),
  "valueFoundAtAnyFields": (async function(restrictionData, docRefs, allRefs) => {

  })()
}

const validationComplete = () => validationResults;

// restrictions
// validate each reference object with its restriction value

// default user validation
// default validates user status and permissions for each CRUD operation specific needs

// default ref validation...
// default validates that refModel and refId exists and all refs exist...

// default docRefs validation: exist and user can read doc
// default allRefs validation: exist and user can read doc

// adminOnly validates that user is ADMIN

// selfOnly validates that user is the creator of refDoc

// selfOnly-all validates taht user is the creator of all ref parent docs

// followingOnly validates that user is following any ref user in the ref Doc

// followingOnly-all validates that user is following all ref doc users

// valueFoundInField

// valueFoundInFields

// valueFoundAtAnyFields


// const validation = await validateOperation.update(writerId, [
//   {
//     refModel: "request".
//     refId: requestId,
//     restriction: "valueFoundInField",
//     restrictionData: { value: writerId, field: "sentFromUserId" }
//   }
// ]);
//
// restriction: "valueFoundInField",
// restrictionInfo: { value: writerId, field: "sentFromUserId" }
// valueFoundInField: { value: writerId, field: "sentFromUserId" }
//
// restriction: "valueFoundInFields",
// restrictionInfo: { value: writerId, fields: ["sentFromUserId", "userId"] }
// valueFoundInFields: { value: writerId, fields: ["sentFromUserId", "userId"] }
//
// restriction: "valueFoundAtAnyFields",
// restrictionInfo: { value: writerId, fields: ["sentFromUserId", "sentToUserId"] }
// valueFoundAtAnyFields: { value: writerId, fields: ["sentFromUserId", "sentToUserId"] }
