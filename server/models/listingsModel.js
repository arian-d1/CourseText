const dbQueries = require("../../server/db/queries");

async function getListings() {
  try {
    const response = await dbQueries.getAllListings();
    return response;
  } catch (err) {
    console.error("Error fetching listings:", err);
    throw err;
  }
}

async function getListingsByCourseCode(courseCode) {
  try {
    const response = await dbQueries.getListingsByCourseCode(courseCode);
    return response;
  } catch (err) {
    console.error("Error fetching listings by course code:", err);
    throw err;
  }
}

async function getListingsBySearchTerm(searchTerm) {}

module.exports = {
  getListings,
  getListingsByCourseCode,
  getListingsBySearchTerm,
};
