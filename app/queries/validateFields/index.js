module.exports = {
  activity: require("./activity"),
  collection: require("./collection"),
  comment: require("./comment"),
  like: require("./like"),
  post: require("./post"),
  report: require("./report"),
  request: require("./request"),
  response: require("./response"),
  tag: require("./tag"),
  user: require("./user"),
}

// validate single field...
// obtain doc model, and then exisiting model...
// create a new object a replace old value with new value...
// remove existing doc._id if needed to avoid errors...
// perhaps on utils, create a tool that pulls some values or all values from
// an existing object and returns a new object,
// (perhaps pass it a config obj to describe which values to pull off or
// which values to left in that object)
// with that new object we can place the new updated value and send that object
// to the fields validation helper
