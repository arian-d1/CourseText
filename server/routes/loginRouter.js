const { Router } = require("express");
const loginRouterController = require("../../server/controllers/loginRouterController");
const loginRouter = new Router();

loginRouter.get("/", loginRouterController.getAuthenticationState);
loginRouter.post("/", loginRouterController.authenticateUser);

module.exports = loginRouter;
