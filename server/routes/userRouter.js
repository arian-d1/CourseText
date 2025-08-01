const { Router } = require("express");
const userRouterController = require("../controllers/userRouterController");
const userRouter = new Router();
const { check } = require("express-validator");

userRouter.get("/:id", [check("id").notEmpty().isNumeric().withMessage("parameter must be a number")], userRouterController.getUserById);
userRouter.get("/id/:user",[check("user").notEmpty().isAlphanumeric().withMessage("parameter must be alphanumeric")], userRouterController.getIdByUser);
userRouter.post("/logout", userRouterController.logOut);

module.exports = userRouter;
