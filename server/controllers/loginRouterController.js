function getLoginPage(req, res) {
  if (req.isAuthenticated()) {
    res.render("dashboard", {user : req.user})
  } else {
    res.render("loginForm")
  }
}

module.exports = { getLoginPage };
