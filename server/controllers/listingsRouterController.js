const listingsModel = require("../models/listingsModel");

async function getListings(req, res) {
  try {
    const response = await listingsModel.getListings();
    res.json(response);
  } catch (error) {
    res.json({ error: error.message || "Error fetching listings" });
  }
}

async function getListingsByCourseCode(req, res) {
  try {
    const courseCode = req.params.code;
    const response = await listingsModel.getListingsByCourseCode(courseCode);
    res.json(response);
  } catch (error) {
    res.json({
      error: error.message || "Error fetching listings by course code",
    });
  }
}

async function getListingsBySearchTerm(req, res) {
  try {
    const searchTerm = req.params.term;
    const response = await listingsModel.getListingsBySearchTerm(searchTerm);
    res.json(response);
  } catch (error) {
    res.json({
      error: error.message || "Error fetching listings by search term",
    });
  }
}

async function getListingsById(req, res) {
    try {
        const id = req.params.id;
        const response = await listingsModel.getListingsById(id);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message || "Error fetching listing by ID" });
    }
}
module.exports = {
  getListings,
  getListingsByCourseCode,
  getListingsBySearchTerm,
  getListingsById
};
