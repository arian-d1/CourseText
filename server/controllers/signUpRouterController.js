const model = require("../models/signUpModel");

function getSignUpPage(req, res) {
  res.render("signupForm");
}

async function putUser(req, res) {
  try {
    await model.addNewUser(req.body.username, req.body.password);
    res.render("index");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getSignUpPage, putUser };
