module.exports.home = (req, res, next) => {
  // res.send("home");
  res.status(200).json({ message: "Welcome Home" })

  next()
}

module.exports.dashboard = (req, res, next) => {
  // res.send('Welcom to your Dashboard');
  res.render("profile.ejs", {
    user: req.user,
  })

  next()
}
