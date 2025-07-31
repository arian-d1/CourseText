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

async function logOut(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ state: req.isAuthenticated() });
  });
}

async function getIdByUser(req, res) {
  try {
    const username = req.params.id;
    const response = await userModel.getIdByUser(username);
    res.json({ id: response });
  } catch (err) {
    res.json({
      error: err.message || "Error fetching ID by username",
    });
  }
}
module.exports = { getUserById, logOut, getIdByUser };
