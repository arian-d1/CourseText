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

module.exports = { getListings };
