// model: activity | field: activityType

const NEW_POST = "NEW_POST"
const NEW_COMMENT = "NEW_COMMENT"
const NEW_RESPONSE = "NEW_RESPONSE"
const POST_LIKE = "POST_LIKE"
const COMMENT_LIKE = "COMMENT_LIKE"
const RESPONSE_LIKE = "RESPONSE_LIKE"
const NEW_FOLLOWING = "NEW_FOLLOWING"

// model: report | field: category

const EXPLICIT_CONTENT = "EXPLICIT_CONTENT"
const AGGRESSIVE_BEHAVIOUR = "AGGRESSIVE_BEHAVIOUR"
const SPAM_BEHAVIOUR = "SPAM_BEHAVIOUR"
const OTHER = "OTHER"

// model: report | field: status

const UNREAD = "UNREAD"
const PROCESSING = "PROCESSING"
const CLOSED = "CLOSED"

// model: request | field: status

const PENDING = "PENDING"
const ACCEPTED = "ACCEPTED"
const DECLINED = "DECLINED"

// model: user | field: account.status

const ACTIVE = "ACTIVE"
const INACTIVE = "INACTIVE"
const SUSPENDED = "SUSPENDED"
const BANNED = "BANNED"

// model: user | field: account.permissions

const READ_WRITE = "READ_WRITE"
const READ_ONLY = "READ_ONLY"
const ADMIN = "ADMIN"
const NONE = "NONE"

// model: user | field: settings.language

const ENGLISH = "ENGLISH"
const SPANISH = "SPANISH"

module.exports = {
  NEW_POST,
  NEW_COMMENT,
  NEW_RESPONSE,
  POST_LIKE,
  COMMENT_LIKE,
  RESPONSE_LIKE,
  NEW_FOLLOWING,

  EXPLICIT_CONTENT,
  AGGRESSIVE_BEHAVIOUR,
  SPAM_BEHAVIOUR,
  OTHER,

  UNREAD,
  PROCESSING,
  CLOSED,

  PENDING,
  ACCEPTED,
  DECLINED,

  ACTIVE,
  INACTIVE,
  SUSPENDED,
  BANNED,

  READ_WRITE,
  READ_ONLY,
  ADMIN,
  NONE,

  ENGLISH,
  SPANISH,
}

// // CHEKC THIS:
//
// module.exports = {
//   CREATED: "New data has been created successfully",
//   FOUND: "The data you were looking for was successfully found",
//   NOT_FOUND: "The data you were looking for was not found",
//   CANNOT_READ: "You cannot read this data",
//   CANNOT_WRITE: "You cannot write to this data",
//   UPDATED: "",
//   PROP_UPDATED: "",
//   DELETED: "",
//   PROP_DELETED: "",
//
//   OPERATION_ERROR: "There was an error in this operation",
//
//   //////////////////////////////////////////////////////////////////////////////
//
//   ACTION_CREATED: "New action has been created successfully",
//   ACTION_FOUND: "The action(s) you were looking for was successfully found",
//   ACTION_NOT_FOUND: "The action(s) you were looking for was not found",
//   CANNOT_READ_ACTION: "Were sorry, you cannot read this action(s)",
//
//   //////////////////////////////////////////////////////////////////////////////
//
//   // MODEL-NAME_PROP_CRUD-OPERATION
//   // e.g.: USER_POST_ADDED
//   // MODEL_OPERATION
//   // e.g.: USER_CREATED
//   // PROP_OPERATION_ALL-INSTANCES-OF-THIS-MODEL
//
//   COLLECTION_CREATED: "New action has been created successfully",
//   CANNOT_CREATE_COLLECTION: "Cannot create collection",
//   COLLECTION_FOUND: "The action(s) you were looking for was successfully found",
//   ALL_COLLECTIONS_FOUND:
//     "The action(s) you were looking for was successfully found",
//   COLLECTION_NOT_FOUND: "The action(s) you were looking for was not found",
//   CANNOT_READ_COLLECTION: "Were sorry, you cannot read this action(s)",
//
//   CANNOT_WRITE_COLLECTION: "Were sorry, you cannot read this action(s)",
//
//   COLLECTION_UPDATED: "Collection has been updated",
//
//   COLLECTION_PROP_UPDATED: "",
//   COLLECTION_THUMBNAIL_UPDATED: "",
//   COLLECTION_NAME_UPDATED: "",
//   COLLECTION_POST_REMOVED: "",
//
//   PROP_REMOVED_FROM_COLLECTIONS: "Post has been removed from all collections",
//   POST_REMOVED_FROM_ALL_COLLECTIONS:
//     "Post has been removed from all collections",
//
//   COLLECTION_DELETED: "",
//   COLLECTION_PROP_DELETED: "",
//
//   //////////////////////////////////////////////////////////////////////////////
//
//   USER_FOUND: "User was found",
//   USER_NOT_FOUND: "User was not found",
//   CANNOT_READ_USER: "Cannot read this user",
//   PROFILE_NOT_FOUND: "User profile was not found",
//   PROFILE_FOUND: "User profile was found"
// };
//
// // try {
// // } catch (error) {
// //   return h.queryOutput(error, cMsg.operationError, null);
// // }
// //
// // return h.queryOutput(error, cMsg.OPERATION_ERROR, null);
// //
// // return h.queryOutput(null, cMsg.MESSAGE, null);
// //
// // return newPromise
// //   .then(updatedCollection =>
// //     h.queryOutput(null, cMsg.COLLECTION_UPDATED, updatedCollection)
// //   )
// //   .catch(error => h.queryOutput(error, cMsg.OPERATION_ERROR, null));
