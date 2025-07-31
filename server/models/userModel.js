const dbQueries = require("../../server/db/queries");

async function getUserById(id) {
  try {
    const response = await dbQueries.getUserById(id);
    return response;
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }
}

module.exports = { getUserById };
