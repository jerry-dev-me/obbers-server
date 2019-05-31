// const assert = require("assert");
// const q = require("../../../app/queries");
// const th = require("../../testHelpers");
//
// const lG = "TESTS-QUERIES"; // logGroup
// const lS = "R-POST"; // logSubgroup
//
// describe("Post Model Read Tests", async function() {
//   this.timeout(0);
//
//   let testUser;
//   let testPost;
//
//   beforeEach(async () => {
//     testUser = await await q.user.create.new(th.fakeFields.user());
//
//     th.logger.log(lG, lS, null, { testUser });
//
//     testPost = await q.post.create.new(
//       testUser._id,
//       th.fakeFields.post({ userId: testUser._id })
//     );
//
//     th.logger.log(lG, lS, null, { testPost });
//   });
//
//   it("Read post by id", async () => {
//     const foundPost = await q.post.read.byId(testUser._id, testPost._id);
//
//     th.logger.log(lG, lS, null, { foundPost });
//
//     assert(foundPost._id.toString() === testPost._id.toString());
//   });
//
//   it("Read all posts by user id", async () => {
//     const foundPosts = await q.post.read.allByUserId(testUser._id, testUser._id);
//
//     th.logger.log(lG, lS, null, { foundPosts });
//
//     assert(foundPosts[0]._id.toString() === testPost._id.toString());
//   });
//
//   it("testUser has 50 posts, skip and limit by 10", async () => {
//     let postsToCreate = 50;
//
//     th.logger.log(lG, lS,
//     `Creating ${postsToCreate} posts, please wait...`);
//
//     for (let i = 0; i < postsToCreate; i++) {
//       testPost = await q.post.create.new(
//         testUser._id,
//         th.fakeFields.post({ userId: testUser._id })
//       );
//
//       th.logger.log(lG, lS, null, { testPost });
//     };
//
//     const foundPosts = await q.post.read.allByUserId(testUser._id, testUser._id);
//
//     th.logger.log(lG, lS,
//     `foundPosts.length`, { foundPostsLength: foundPosts.length });
//
//     th.logger.log(lG, lS, null, { foundPosts });
//
//     // ReadUser user.posts.length
//
//     // ReadUser user.totalPosts
//
//     assert(foundPosts.length === postsToCreate +1);
//   });
//
//   it("search posts nearby New York City", async () => {
//     const newYorkCity = {
//       lng: parseFloat(-73.935242),
//       lat: parseFloat(40.730610)
//     };
//
//     const newJersey = {
//       lng: parseFloat(-74.871826),
//       lat: parseFloat(39.833851)
//     };
//
//     const sanFrancisco = {
//       lng: parseFloat(-122.446747),
//       lat: parseFloat(37.733795)
//     };
//
//     // from private user testUser is not following, it shouldnt be visible
//     const privateUser = await q.user.create.new(th.fakeFields.user({
//       settings: { private: true }
//     }));
//     const newYorkPrivatePost = await q.post.create.new(
//       privateUser._id,
//       th.fakeFields.post({ userId: privateUser._id, location: newYorkCity })
//     );
//
//     // from public user, post should be visible from within X maxDistance
//     const publicUser1 = await q.user.create.new(th.fakeFields.user());
//     const newYorkPost = await q.post.create.new(
//       publicUser1._id,
//       th.fakeFields.post({ userId: publicUser1._id, location: newYorkCity })
//     );
//
//     // from public user, post should be visible from within X maxDistance
//     const publicUser2 = await q.user.create.new(th.fakeFields.user());
//     const newJerseyPost = await q.post.create.new(
//       publicUser2._id,
//       th.fakeFields.post({ userId: publicUser2._id, location: newJersey })
//     );
//
//     // from public user, post should be visible from within X maxDistance
//     const publicUser3 = await q.user.create.new(th.fakeFields.user());
//     const sanFranciscoPost = await q.post.create.new(
//       publicUser3._id,
//       th.fakeFields.post({ userId: publicUser3._id, location: sanFrancisco })
//     );
//
//     th.logger.log(lG, lS, null, { newYorkPrivatePost });
//     th.logger.log(lG, lS, null, { newYorkPost });
//     th.logger.log(lG, lS, null, { newJerseyPost });
//     th.logger.log(lG, lS, null, { sanFranciscoPost });
//
//     // maxDistance is on meters
//     // (1 Km = 1000 meters)
//     // (1 mile = 1609.32 meters | 1 mile = 1.60934 km)
//     // (1 km = 0.621371 | 1 meter = 0.000621371 miles)
//
//     const maxDistance1 = 1000; //
//     const maxDistance2 = 2000000; // Distance NY to NJ = 1270.3 KM, 1270300 m
//     const maxDistance3 = 5000000; // Distance NY to SF = 4138.16 KM, 4138160 m
//
//     const nearbyNewYorkPostsAtMaxDistance1 = await q.post.read.nearby(
//       testUser._id,
//       newYorkCity,
//       maxDistance1
//     );
//
//     const nearbyNewYorkPostsAtMaxDistance2 = await q.post.read.nearby(
//       testUser._id,
//       newYorkCity,
//       maxDistance2
//     );
//
//     const nearbyNewYorkPostsAtMaxDistance3 = await q.post.read.nearby(
//       testUser._id,
//       newYorkCity,
//       maxDistance3
//     );
//
//     th.logger.log(lG, lS, null, { nearbyNewYorkPostsAtMaxDistance1 });
//     th.logger.log(lG, lS, null, { nearbyNewYorkPostsAtMaxDistance2 });
//     th.logger.log(lG, lS, null, { nearbyNewYorkPostsAtMaxDistance3 });
//
//     assert(nearbyNewYorkPostsAtMaxDistance1.length === 1);
//     assert(nearbyNewYorkPostsAtMaxDistance2.length === 2);
//     assert(nearbyNewYorkPostsAtMaxDistance3.length === 3);
//   });
//
//   // it('non-blocked follower attempts to read public user testPost', async () => {
//   // });
//
//   // it('non-blocked non-follower attempts to read public user testPost', async () => {
//   // });
//
//   // it('non-blocked follower attempts to read private user testPost', async () => {
//   // });
//
//   // it('non-blocked non-follower attempts to read private user testPost', async () => {
//   // });
//
//   // it('blocked follower attempts to read public user testPost', async () => {
//   // });
//
//   // it('blocked non-follower attempts to read public user testPost', async () => {
//   // });
//
//   // it('blocked follower attempts to read private user testPost', async () => {
//   // });
//
//   // it('blocked non-follower attempts to read private user testPost', async () => {
//   // });
//
//   // it(`non-blocked follower reads all 50 private user's testPosts`, async () => {
//   //     // Sort by Recent Date first. Skip and Limit by 20.
//   // });
//
//   // it('testUser reads 200 posts from random public users - Explore Screen', async () => {
//   //     // Sort by Recent Date first. Skip and Limit by 20.
//   // });
// });
