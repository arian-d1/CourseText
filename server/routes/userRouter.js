const { Router } = require("express");
const userRouterController = require("../controllers/userRouterController");
const userRouter = new Router();

userRouter.get("/:id", userRouterController.getUserById);

module.exports = userRouter;
