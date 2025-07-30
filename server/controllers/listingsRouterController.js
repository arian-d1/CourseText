const listingsModel = require("../models/listingsModel");

async function getListings(req, res) {
  try {
    const response = await listingsModel.getListings();
    res.json(response)
  } catch (error) {
    res.json({ error: error.message || "Error fetching listings" });
  }
}
module.exports = { getListings };
