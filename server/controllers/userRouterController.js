const userModel = require("../models/userModel");

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const response = await userModel.getUserById(id);
    res.json({ username: response });
  } catch (err) {
    res.json({
      error: err.message || "Error fetching user by ID",
    });
  }
}

module.exports = { getUserById };
