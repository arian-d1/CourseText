const { Router } = require("express");
const listingsRouterController = require("../controllers/listingsRouterController.js");
const listingsRouter = new Router();
const { check, body } = require("express-validator");

const validationRules = [
  body("title")
    .trim()
    .isAlphanumeric()
    .withMessage("Title must contain only alphanumeric characters")
    .notEmpty(),
  body("description")
    .trim()
    .isAlphanumeric()
    .withMessage("Description must contain only alphanumeric characters")
    .notEmpty(),
  body("price").isNumeric().withMessage("Price must be a number").notEmpty(),
  body("code")
    .trim()
    .matches(/^[A-Z]{2,4}\-[0-9]{3}$/)
    .withMessage("Course code must be in the format of 'MATH-100'")
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
      .withMessage("Parameter must be alphanumeric"),
  ],
  listingsRouterController.getListingsBySearchTerm,
);
// needs to be sanitized and validated maybe.....
listingsRouter.get(
  "/code/:code",
  [
    check("code")
      .notEmpty()
      .isLength({ min: 6, max: 8 })
      .withMessage("Course codes must be between 6 and 8 characters long")
      .matches(/[A-Z]{2,4}\-[0-9]{3}/)
      .withMessage("Parameter must be a course code (e.g. MATH-100)"),
  ],
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
