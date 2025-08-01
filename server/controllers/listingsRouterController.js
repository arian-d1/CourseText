const listingsModel = require("../models/listingsModel");
const { validationResult } = require("express-validator");

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const searchTerm = req.params.term;
    const response = await listingsModel.getListingsBySearchTerm(searchTerm);
    res.json(response);
  } catch (error) {
    res.json({
      error: error.message || "Error fetching listings by search term",
    });
  }
}

async function getListingsByUserId(req, res) {
  try {
    const id = req.params.id;
    const response = await listingsModel.getListingsByUserId(id);
    res.json(response);
  } catch (error) {
    res.json({ error: error.message || "Error fetching listing by ID" });
  }
}

async function deleteListing(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    await listingsModel.deleteListing(id);
    res.json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    res.json({
      success: false,
      error: error.message || "Error deleting listing",
    });
  }
}

async function createListing(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await listingsModel.createListing(req.body);
    res.json({ success: true, message: "Listing created successfully" });
  } catch (error) {
    res.json({
      success: false,
      error: error.message || "Error creating listing",
    });
  }
}

module.exports = {
  getListings,
  getListingsByCourseCode,
  getListingsBySearchTerm,
  getListingsByUserId,
  deleteListing,
  createListing,
};
