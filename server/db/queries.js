const db = require("./pool");

async function containsUser(username) {
  const result = await db.query("SELECT FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows.length != 0;
}

async function insertUser(username, password) {
  await db.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [
    username,
    password,
  ]);
}

async function getUserById(id) {
  const result = await db.query("SELECT username FROM users WHERE id = $1", [
    id,
  ]);
  if (result.rows.length === 0) {
    return "";
  } else {
    return result.rows[0].username;
  }
}

async function getAllListings() {
  const result = await db.query("SELECT * FROM listings");
  return result.rows;
}

async function getListingsByCourseCode(courseCode) {
  const result = await db.query("SELECT * FROM listings WHERE code = $1", [
    courseCode,
  ]);
  return result.rows;
}

async function getListingsBySearchTerm(searchTerm) {
  const result = await db.query(
    "SELECT * FROM listings WHERE LOWER(title) LIKE LOWER($1) OR LOWER(code) LIKE LOWER($1)",
    [`%${searchTerm}%`],
  );
  return result.rows;
}

async function getListingsById(id) {
  const result = await db.query(`SELECT * FROM listings WHERE user_id = $1;`, [
    id,
  ]);
  return result.rows;
}

async function getIdByUser(id) {
  const result = await db.query("SELECT id FROM users WHERE username = $1", [
    id,
  ]);
  if (result.rows.length === 0) {
    return "";
  } else {
    return result.rows[0].id;
  }
}

async function deleteListing(id) {
  await db.query("DELETE FROM listings WHERE id = $1", [id]);
}

module.exports = {
  containsUser,
  insertUser,
  getUserById,
  getAllListings,
  getListingsByCourseCode,
  getListingsBySearchTerm,
  getListingsById,
  getIdByUser,
  deleteListing,
};
