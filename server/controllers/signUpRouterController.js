const model = require("../models/signUpModel");

async function putUser(req, res) {
  try {
    const result = await model.addNewUser(req.body.username, req.body.password);
    if (!result) {
      return res
        .status(409)
        .json({ error: "User already exists. Try a new username." });
    }
    return res.json({ success: true, username: req.body.username });
  } catch (err) {
    return res.status(500).json({ error: err || "Login error" });
  }
}

module.exports = { putUser };
