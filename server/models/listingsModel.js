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

async function getListingsBySearchTerm(searchTerm) {
  try {
    const response = await dbQueries.getListingsBySearchTerm(searchTerm);
    return response;
  } catch (err) {
    console.error("Error fetching listings by search term:", err);
    throw err;
  }
}

async function getListingsByUserId(id) {
  try {
    const response = await dbQueries.getListingsByUserId(id);
    return response;
  } catch (err) {
    console.error("Error fetching listing by ID:", err);
    throw err;
  }
}

async function deleteListing(id) {
  try {
    await dbQueries.deleteListing(id);
  } catch (err) {
    console.error("Error deleting listing:", err);
    throw err;
  }
}

async function createListing(listingData) {
  try {
    const { title, description, price, code, user_id } = listingData;
    await dbQueries.createListing(title, description, price, code, user_id);
  } catch (err) {
    console.error("Error creating listing:", err);
    throw err;
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
