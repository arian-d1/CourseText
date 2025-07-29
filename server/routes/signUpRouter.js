const { Router } = require("express");
const signUpRouterController = require("../controllers/signUpRouterController");
const signUpRouter = new Router();

signUpRouter.get("/", signUpRouterController.getSignUpPage);

module.exports = signUpRouter;
