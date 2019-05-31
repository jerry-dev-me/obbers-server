const router = require("express").Router()
const controllers = require("./controllers/users")

// '/api/users'

router.route("/").post(controllers.post.new) // or create user account...
// to create an account according to our app design the next requirements
// should be fullfilled:
// • link a social profile is optional
// • email is required...
// • username is required...

router
  .route("/:id")
  .get(controllers.get.byId) // only admins can do this op
  .delete(controllers.delete.byId) // only admins can do this op

router.route("/:id/profile").get(controllers.get.profile)

router.route("/search?username=username").get(controllers.get.byUsername)

router.route("/search?name=name").get(controllers.get.byName)

router.route("/self/archived").get(controllers.get.archivedPosts)

router.route("/self/collections").get(controllers.get.collections)

router.route("/:id/following").get(controllers.get.following)

router.route("/:id/followers").get(controllers.get.followers)

router.route("/self/requests").get(controllers.get.requests)

router.route("/self/blocked").get(controllers.get.blockedUsers)

router.route("/:id/tagged").get(controllers.get.taggedPosts)

router.route("/self/liked-posts").get(controllers.get.likedPosts)

router.route("/self/email").put(controllers.put.email)

router.route("/self/password").put(controllers.put.password)

router
  .route("/self/add/archived-posts/:postId")
  .put(controllers.put.addArchivedPost)

router
  .route("/self/remove/archived-posts/:postId")
  .put(controllers.put.removeArchivedPost)

router
  .route("/self/remove/following/:userId")
  .put(controllers.put.removeFollowing)

router.route("/self/add/blocked/:userId").put(controllers.put.addBlocked)

router.route("/:id/account-status").put(controllers.put.accountStatus)

// check if this should be publicontrollers...
router.route("/:id/account-permissions").put(controllers.put.accountPermissions) // send new permissions...
// send string of new permission name? or call api route that does that for us...
// EJEMPLO: Operation: set permissions to ADMIN...
// Instead of sending "ADMIN" from the client...
// just call this from the client: /api/users/account/permissions/admin?

router.route("/self/settings-private").put(controllers.put.settingsPrivate)

router.route("/self/settings-language").put(controllers.put.settingsLanguage)

router
  .route("/self/settings-notifications")
  .put(controllers.put.settingsNotifications)

module.exports = router
