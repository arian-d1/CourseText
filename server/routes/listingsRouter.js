const { Router } = require("express");
const listingsRouterController = require("../controllers/listingsRouterController.js");

const listingsRouter = new Router();

listingsRouter.get("/", listingsRouterController.getListings);
listingsRouter.get(
  "/search/term/:term",
  listingsRouterController.getListingsBySearchTerm,
);
listingsRouter.get(
  "/search/code/:code",
  listingsRouterController.getListingsByCourseCode,
);
// listingsRouter.post("/", listingsRouterController.createListing);

// listingsRouter.delete("/:id", listingsRouterController.deleteListing);
// listingsRouter.put("/:id", listingsRouterController.updateListing);
// listingsRouter.get("/:id", listingsRouterController.getListingById);
// listingsRouter.get("/user/:id", listingsRouterController.getListingsByUserId);

module.exports = listingsRouter;
