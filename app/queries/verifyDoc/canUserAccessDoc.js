const logger = require("../../../lib/logger");
const lG = "QUERIES-VERIFY-DOC"; // logGroup
const lS = "CAN-USER-READ-DOC"; // logSubgroup

const h = require("../../helpers");
const e = require("../../errors/queries/verifyDoc");
const crud = require("../crud");
const exists = require("./exists");
const verifyUser = require("../verifyUser");
const getUserIdCreator = require("./getUserIdCreator");

const canUserAccessDoc = async (readerDoc, model, doc) => {
  if (model === "activity") {
    try {
      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      const isUserFollowing = await verifyUser.isUserFollowing.checkId(
        readerDoc._id,
        userIdCreator
      );
      logger.log(lG, lS, null, { isUserFollowing });

      if (isUserFollowing === false)
        throw new e.AccessDenied.MustBeFollowingUser(new Error().stack);

      const canUserReadUser = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        userIdCreator
      );
      logger.log(lG, lS, null, { canUserReadUser });

      if (canUserReadUser === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      const refDoc = await exists.checkId(doc.refModel, doc.refId);
      logger.log(lG, lS, null, { refDoc });

      if (refDoc === false)
        throw new e.DocDoesNotExist(doc.refModel, new Error().stack);

      logger.log(lG, lS, null, { refModel: doc.refModel });
      logger.log(lG, lS, null, { refId: doc.refId });

      const refUserIdCreator = getUserIdCreator.checkDoc(doc.refModel, refDoc);
      logger.log(lG, lS, null, { refUserIdCreator });

      if (doc.refModel === "post") {
        const isRefUserIdCreatorPrivate = await verifyUser.isSettings.private.checkId(
          refUserIdCreator
        );
        logger.log(lG, lS, null, { isRefUserIdCreatorPrivate });

        const isUserFollowingRefIdCreator = await verifyUser.isUserFollowing.checkId(
          readerDoc._id,
          refUserIdCreator
        );
        logger.log(lG, lS, null, { isUserFollowingRefIdCreator });

        if (
          isRefUserIdCreatorPrivate === true &&
          isUserFollowingRefIdCreator === false
        )
          throw new e.AccessDenied.MustBeFollowingPrivateUser(
            new Error().stack
          );

        const canUserReadRefUserIdCreator = await verifyUser.canUserReadUser.checkId(
          readerDoc._id,
          refUserIdCreator
        );
        logger.log(lG, lS, null, { canUserReadRefUserIdCreator });

        if (canUserReadRefUserIdCreator === false)
          throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);
      } else {
        const canUserReadRefUserIdCreator = await verifyUser.canUserReadUser.checkId(
          readerDoc._id,
          refUserIdCreator
        );
        logger.log(lG, lS, null, { canUserReadRefUserIdCreator });

        if (canUserReadRefUserIdCreator === false)
          throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);
      }

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }

  if (model === "collection") {
    try {
      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      const isSameUser = verifyUser.isSameUser(readerDoc._id, userIdCreator);
      logger.log(lG, lS, null, { isSameUser });

      if (isSameUser === false)
        throw new e.AccessDenied.MustBeDocCreator(new Error().stack);

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }

  if (model === "comment") {
    try {
      const commentUserIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { commentUserIdCreator });

      const canUserReadCommentUserIdCreator = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        commentUserIdCreator
      );
      logger.log(lG, lS, null, { canUserReadCommentUserIdCreator });

      if (canUserReadCommentUserIdCreator === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      const postDoc = await exists.checkId("post", doc.postId);
      logger.log(lG, lS, null, { postDoc });

      if (postDoc === false)
        throw new e.DocDoesNotExist("post", new Error().stack);

      const postUserIdCreator = getUserIdCreator.checkDoc("post", postDoc);
      logger.log(lG, lS, null, { postUserIdCreator });

      const isPostUserIdCreatorPrivate = await verifyUser.isSettings.private.checkId(
        postUserIdCreator
      );
      logger.log(lG, lS, null, { isPostUserIdCreatorPrivate });

      const isUserFollowing = await verifyUser.isUserFollowing.checkId(
        readerDoc._id,
        postUserIdCreator
      );
      logger.log(lG, lS, null, { isUserFollowing });

      if (isPostUserIdCreatorPrivate === true && isUserFollowing === false)
        throw new e.AccessDenied.MustBeFollowingPrivateUser(new Error().stack);

      const canUserReadPostUserIdCreator = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        postUserIdCreator
      );
      logger.log(lG, lS, null, { canUserReadPostUserIdCreator });

      if (canUserReadPostUserIdCreator === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }

  if (model === "like") {
    try {
      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      const isUserFollowing = await verifyUser.isUserFollowing.checkId(
        readerDoc._id,
        userIdCreator
      );
      logger.log(lG, lS, null, { isUserFollowing });

      if (isUserFollowing === false)
        throw new e.AccessDenied.MustBeFollowingUser(new Error().stack);

      const canUserReadUser = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        userIdCreator
      );
      logger.log(lG, lS, null, { canUserReadUser });

      if (canUserReadUser === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      const refDoc = await exists.checkId(doc.refModel, doc.refId);
      logger.log(lG, lS, null, { refDoc });

      if (refDoc === false)
        throw new e.DocDoesNotExist(doc.refModel, new Error().stack);

      const refUserIdCreator = getUserIdCreator.checkDoc(
        doc.refModel,
        doc.refId
      );
      logger.log(lG, lS, null, { refUserIdCreator });

      if (doc.refModel === "post") {
        const isPostUserIdCreatorPrivate = await verifyUser.isSettings.private.checkId(
          refUserIdCreator
        );
        logger.log(lG, lS, null, { isPostUserIdCreatorPrivate });

        const isUserFollowing = await verifyUser.isUserFollowing.checkId(
          readerDoc._id,
          refUserIdCreator
        );
        logger.log(lG, lS, null, { isUserFollowing });

        if (isPostUserIdCreatorPrivate === true && isUserFollowing === false)
          throw new e.AccessDenied.MustBeFollowingPrivateUser(
            new Error().stack
          );

        const canUserReadRefUserIdCreator = await verifyUser.canUserReadUser.checkId(
          readerDoc._id,
          refUserIdCreator
        );
        logger.log(lG, lS, null, { canUserReadRefUserIdCreator });

        if (canUserReadRefUserIdCreator === false)
          throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);
      } else {
        const canUserReadRefUserIdCreator = await verifyUser.canUserReadUser.checkId(
          readerDoc._id,
          refUserIdCreator
        );
        logger.log(lG, lS, null, { canUserReadRefUserIdCreator });

        if (canUserReadRefUserIdCreator === false)
          throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);
      }
      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }

  if (model === "post") {
    try {
      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      const canUserReadUserIdCreator = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        userIdCreator
      );
      logger.log(lG, lS, null, { canUserReadUserIdCreator });

      if (canUserReadUserIdCreator === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      const isUserIdCreatorPrivate = await verifyUser.isSettings.private.checkId(
        userIdCreator
      );
      logger.log(lG, lS, null, { isUserIdCreatorPrivate });

      const isUserFollowing = await verifyUser.isUserFollowing.checkId(
        readerDoc._id,
        userIdCreator
      );
      logger.log(lG, lS, null, { isUserFollowing });

      if (isUserIdCreatorPrivate === true && isUserFollowing === false)
        throw new e.AccessDenied.MustBeFollowingPrivateUser(new Error().stack);

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }

  if (model === "report") {
    try {
      const isUserAdmin = verifyUser.isPermissions.admin.checkDoc(readerDoc);
      logger.log(lG, lS, null, { isUserAdmin });

      if (isUserAdmin === false)
        throw new e.AccessDenied.MustBeAdmin(new Error().stack);

      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      const canUserReadUserIdCreator = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        userIdCreator
      );
      logger.log(lG, lS, null, { canUserReadUserIdCreator });

      if (canUserReadUserIdCreator === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }

  if (model === "request") {
    try {
      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      if (canUserReadUserIdCreator === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      const isUserSentFrom = verifyUser.isSameUser(
        readerDoc._id,
        doc.sentFromUserId
      );
      logger.log(lG, lS, null, { isUserSentFrom });

      const isUserSentTo = verifyUser.isSameUser(
        readerDoc._id,
        doc.sentToUserId
      );
      logger.log(lG, lS, null, { isUserSentTo });

      if (!(isUserSentFrom === true || isUserSentTo === true))
        throw new e.AccessDenied.MustBeDocSenderOrRecipient(new Error().stack);

      if (isUserSentTo === true) {
        const canUserReadUser = await verifyUser.canUserReadUser.checkId(
          readerDoc._id,
          userIdCreator
        );
        logger.log(lG, lS, null, { canUserReadUser });

        if (canUserReadUser === false)
          throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);
      }

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }

  if (model === "response") {
    try {
      const responseUserIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { responseUserIdCreator });

      const canUserReadResponseUserIdCreator = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        responseUserIdCreator
      );
      logger.log(lG, lS, null, { canUserReadResponseUserIdCreator });

      if (canUserReadResponseUserIdCreator === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      const commentDoc = await exists.checkId("comment", doc.commentId);
      logger.log(lG, lS, null, { commentDoc });

      if (commentDoc === false)
        throw new e.DocDoesNotExist("comment", new Error().stack);

      const commentUserIdCreator = getUserIdCreator.checkDoc(
        "comment",
        commentDoc
      );
      logger.log(lG, lS, null, { commentUserIdCreator });

      const canUserReadCommentUserIdCreator = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        commentUserIdCreator
      );
      logger.log(lG, lS, null, { canUserReadCommentUserIdCreator });

      if (canUserReadCommentUserIdCreator === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      const postDoc = await exists.checkId("post", commentDoc.postId);
      logger.log(lG, lS, null, { postDoc });

      if (postDoc === false)
        throw new e.DocDoesNotExist("post", new Error().stack);

      const postUserIdCreator = getUserIdCreator.checkDoc("post", postDoc);
      logger.log(lG, lS, null, { postUserIdCreator });

      const isPostUserIdCreatorPrivate = await verifyUser.isSettings.private.checkId(
        postUserIdCreator
      );
      logger.log(lG, lS, null, { isPostUserIdCreatorPrivate });

      const isUserFollowing = await verifyUser.isUserFollowing.checkId(
        readerDoc._id,
        postUserIdCreator
      );
      logger.log(lG, lS, null, { isUserFollowing });

      if (isPostUserIdCreatorPrivate === true && isUserFollowing === false)
        throw new e.AccessDenied.MustBeFollowingPrivateUser(new Error().stack);

      const canUserReadPostUserIdCreator = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        postUserIdCreator
      );
      logger.log(lG, lS, null, { canUserReadPostUserIdCreator });

      if (canUserReadPostUserIdCreator === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }

  if (model === "tag") {
    try {
      const postDoc = await exists.checkId("post", doc.postId);
      logger.log(lG, lS, null, { postDoc });

      if (postDoc === false)
        throw new e.DocDoesNotExist("post", new Error().stack);

      const postUserIdCreator = getUserIdCreator.checkDoc("post", postDoc);
      logger.log(lG, lS, null, { postUserIdCreator });

      const isPostUserIdCreatorPrivate = await verifyUser.isSettings.private.checkId(
        postUserIdCreator
      );
      logger.log(lG, lS, null, { isPostUserIdCreatorPrivate });

      const isUserFollowing = await verifyUser.isUserFollowing.checkId(
        readerDoc._id,
        postUserIdCreator
      );
      logger.log(lG, lS, null, { isUserFollowing });

      if (isPostUserIdCreatorPrivate === true && isUserFollowing === false)
        throw new e.AccessDenied.MustBeFollowingPrivateUser(new Error().stack);

      const canUserReadPostUserIdCreator = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        postUserIdCreator
      );
      logger.log(lG, lS, null, { canUserReadPostUserIdCreator });

      if (canUserReadPostUserIdCreator === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      const canUserReadTaggedUserId = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        doc.userId
      );
      logger.log(lG, lS, null, { canUserReadTaggedUserId });

      if (canUserReadTaggedUserId === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }

  if (model === "user") {
    try {
      const userIdCreator = getUserIdCreator.checkDoc(model, doc);
      logger.log(lG, lS, null, { userIdCreator });

      const canUserReadUser = await verifyUser.canUserReadUser.checkId(
        readerDoc._id,
        userIdCreator
      );
      logger.log(lG, lS, null, { canUserReadUser });

      if (canUserReadUser === false)
        throw new e.AccessDenied.MustBeAbleToReadUser(new Error().stack);

      return true;
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }
};

module.exports = {
  checkId: async (readerId, model, docId) => {
    try {
      logger.log(lG, lS, null, { readerId });
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { docId });

      const readerDoc = await exists.checkId("user", readerId);
      logger.log(lG, lS, null, { readerDoc });

      if (readerDoc === false) throw new e.UserDoesNotExist(new Error().stack);

      const doc = await exists.checkId("activity", docId);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      return await canUserAccessDoc(readerDoc, model, doc);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  },
  checkDoc: async (readerId, model, doc) => {
    try {
      logger.log(lG, lS, null, { readerId });
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { doc });

      const readerDoc = await exists.checkId("user", readerId);
      logger.log(lG, lS, null, { readerDoc });

      if (readerDoc === false) throw new e.UserDoesNotExist(new Error().stack);

      doc = exists.checkDoc(doc);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      return await canUserAccessDoc(readerDoc, model, doc);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  },
  checkDocs: async (readerDoc, model, doc) => {
    try {
      logger.log(lG, lS, null, { readerDoc });
      logger.log(lG, lS, null, { model });
      logger.log(lG, lS, null, { doc });

      readerDoc = exists.checkDoc(readerDoc);
      logger.log(lG, lS, null, { readerDoc });

      if (readerDoc === false) throw new e.UserDoesNotExist(new Error().stack);

      doc = exists.checkDoc(doc);
      logger.log(lG, lS, null, { doc });

      if (doc === false) throw new e.DocDoesNotExist(model, new Error().stack);

      return await canUserAccessDoc(readerDoc, model, doc);
    } catch (err) {
      logger.log(lG, lS, null, { err });
      return e.HandleVerifyDocError(err);
    }
  }
};
