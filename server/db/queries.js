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

async function getUserNameByID(id) {
  const result = await db.query("SELECT username FROM users WHERE id = $1", [
    id,
  ]);
  if (result.rows.length === 0) {
    return "";
  } else {
    return rows[0].username;
  }
}

async function getAllListings() {
  const result = await db.query("SELECT * FROM listings");
  return result.rows;
}

async function getListingsByCourseCode(courseCode) {
  const result = await db.query(
    "SELECT * FROM listings WHERE code = $1",
    [courseCode]
  );
  console.log(result.rows);
  return result.rows;
}

module.exports = { containsUser, insertUser, getUserNameByID, getAllListings, getListingsByCourseCode };
