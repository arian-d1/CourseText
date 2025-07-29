const { body } = require("express-validator");

module.exports = [body(["username", "password"]).isAlphanumeric().escape()];
