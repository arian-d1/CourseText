const model = require("../models/signUpModel");

async function putUser(req, res) {
  try {
    console.log(req.body.password);
    await model.addNewUser(req.body.username, req.body.password);
    res.redirect("http://localhost:5173/log-in");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { putUser };
