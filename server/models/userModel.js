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

async function getIdByUser(username) {
  try {
    const response = await dbQueries.getIdByUser(username);
    return response;
  } catch (err) {
    console.error("Error fetching ID by username:", err);
    throw err;
  }
}

module.exports = { getUserById, getIdByUser };
