const model = require("../models/signUpModel");

function getSignUpPage(req, res) {
  res.render("signupForm");
  console.log(req.isAuthenticated());
  console.log(req.user);
}

async function putUser(req, res) {
  try {
    await model.addNewUser(req.body.username, req.body.password);
    console.log(req.isAuthenticated());
    res.redirect("/log-in")
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getSignUpPage, putUser };
