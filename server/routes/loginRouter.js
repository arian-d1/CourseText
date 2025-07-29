const { Router } = require("express");
const loginRouterController = require("../../server/controllers/loginRouterController");
const passport = require("passport");
const loginRouter = new Router();

loginRouter.get("/", loginRouterController.getLoginPage);
loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/log-in",
    failureRedirect: "/log-in",
  }),
);

module.exports = loginRouter;
