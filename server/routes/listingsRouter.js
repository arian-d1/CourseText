const { Router } = require("express");
const listingsRouterController = require("../controllers/listingsRouterController.js");
const listingsRouter = new Router();
const { check, body } = require("express-validator");

const validationRules = [
  body("title")
    .isAlphanumeric()
    .withMessage("Title must contain only alphanumeric characters")
    .trim()
    .notEmpty(),
  body("description")
    .isAlphanumeric()
    .withMessage("Description must contain only alphanumeric characters")
    .trim()
    .notEmpty(),
  body("price").isNumeric().withMessage("Price must be a number").notEmpty(),
  body("code")
    .isAlphanumeric()
    .withMessage("Course code must contain only alphanumeric characters")
    .trim()
    .notEmpty(),
  body("user_id")
    .isAlphanumeric()
    .withMessage("user_id must be a number")
    .notEmpty(),
];

listingsRouter.get("/", listingsRouterController.getListings);
listingsRouter.get(
  "/term/:term",
  [
    check("term")
      .notEmpty()
      .matches(/^[a-zA-Z0-9\-]+/)
      .withMessage("Parameter must be alphanumeric or a course code"),
  ],
  listingsRouterController.getListingsBySearchTerm,
);
// needs to be sanitized and validated maybe.....
listingsRouter.get(
  "/code/:code",
  listingsRouterController.getListingsByCourseCode,
);
listingsRouter.get("/id/:id", listingsRouterController.getListingsByUserId);
listingsRouter.post(
  "/",
  validationRules,
  listingsRouterController.createListing,
);
listingsRouter.delete(
  "/delete/:id",
  [check("id").notEmpty().isNumeric().withMessage("Parameter must be numeric")],
  listingsRouterController.deleteListing,
);
// listingsRouter.put("/:id", listingsRouterController.updateListing);

module.exports = listingsRouter;
