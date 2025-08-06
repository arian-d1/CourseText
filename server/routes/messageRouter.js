const { Router } = require("express");
const messageRouterController = require("../controllers/messageRouterController");
const messageRouter = new Router();
const { check, body } = require("express-validator");

const validationRules = [
  body("message")
    .isAlphanumeric()
    .withMessage("Message must contain only alphanumeric characters")
    .trim()
    .notEmpty(),
];

messageRouter.get(
  "/:receiverId",
  [
    check("receiverId")
      .notEmpty()
      .isNumeric()
      .withMessage("Receiver ID must be a number"),
  ],
  messageRouterController.getMessagesByReceiverId,
);

module.exports = messageRouter;
