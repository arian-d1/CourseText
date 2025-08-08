const db = require("../db/queries");
const passport = require("passport");
const { validationResult } = require("express-validator");

async function authenticateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Auth error:", err);
      return res.status(500).json({ error: "Authentication error" });
    }

    if (!user) {
      console.log("Auth failed:", info?.message || "No user found");
      return res
        .status(401)
        .json({ error: info?.message || "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Login error" });
      }

      console.log("User authenticated:", user);
      return res.json({ success: true, user });
    });
  })(req, res, next);
}

function getAuthenticationState(req, res) {
  console.log(req.isAuthenticated())    
  if (req.isAuthenticated()) {
    return res.json({
      success: true,
      state: req.isAuthenticated(),
      username: req.user.username,
      id: req.user.id,
    });
  } else {
    return res.json({
      success: false,
      state: req.isAuthenticated(),
      username: null,
      id: null,
    });
  }
}

module.exports = { authenticateUser, getAuthenticationState };
