const { Router } = require("express");
const signUpRouterController = require("../../server/controllers/signUpRouterController");
const signUpRouter = new Router();

signUpRouter.get("/", signUpRouterController.getSignUpPage);
signUpRouter.post("/", signUpRouterController.putUser);

module.exports = signUpRouter;
