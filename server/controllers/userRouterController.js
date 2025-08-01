const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");

async function getUserById(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const response = await userModel.getUserById(id);
    res.json({ success: true, username: response });
  } catch (err) {
    res.json({
      success: false,
      error: err.message || "Error fetching user by ID",
    });
  }
}

async function logOut(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ success: true, state: req.isAuthenticated() });
  });
}

async function getIdByUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("Errors:", errors);
    const username = req.params.user;
    const response = await userModel.getIdByUser(username);
    res.json({ success: true, id: response });
  } catch (err) {
    res.json({
      success: false,
      error: err.message || "Error fetching ID by username",
    });
  }
}
module.exports = { getUserById, logOut, getIdByUser };
