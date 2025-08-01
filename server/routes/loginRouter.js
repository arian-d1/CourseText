const { Router } = require("express");
const loginRouterController = require("../../server/controllers/loginRouterController");
const loginRouter = new Router();
const { body } = require("express-validator");

const validationRules = [
  body("username")
    .isAlphanumeric()
    .withMessage("Username must contain only alphanumeric characters")
    .trim()
    .notEmpty(),
  body("password")
    .isAlphanumeric()
    .withMessage("Password must contain only alphanumeric characters")
    .trim()
    .notEmpty(),
];

loginRouter.get("/", loginRouterController.getAuthenticationState);
loginRouter.post("/", validationRules, loginRouterController.authenticateUser);

module.exports = loginRouter;
