const { Router } = require("express");
const signUpRouterController = require("../../server/controllers/signUpRouterController");
const signUpRouter = new Router();
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
signUpRouter.post("/", validationRules, signUpRouterController.putUser);

module.exports = signUpRouter;
