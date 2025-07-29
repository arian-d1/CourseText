const { Router } = require("express");
const loginRouterController = require("../controllers/loginRouterController");
const loginRouter = new Router();

loginRouter.get("/", loginRouterController.getLoginPage);

module.exports = loginRouter;
