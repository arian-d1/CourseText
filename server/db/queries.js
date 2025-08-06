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
  const result = await db.query("SELECT * FROM listings WHERE code LIKE $1", [
    `${courseCode}%`,
  ]);
  return result.rows;
}

async function getListingsBySearchTerm(searchTerm) {
  const result = await db.query(
    "SELECT * FROM listings WHERE LOWER(title) LIKE LOWER($1)",
    [`%${searchTerm}%`],
  );
  return result.rows;
}

async function getListingsByUserId(id) {
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

async function createListing(title, description, price, code, user_id) {
  await db.query(
    `INSERT INTO listings (title, description, price, code, user_id) 
     VALUES ($1, $2, $3, $4, $5);`,
    [title, description, price, code, user_id],
  );
}

async function getMessagesByReceiverId(receiverId) {
  const result = await db.query(
    "SELECT * FROM messages WHERE receiver_id = $1",
    [receiverId],
  );
  return result.rows;
}

async function createMessage(senderId, receiverId, message) {
  await db.query(
    "INSERT INTO messages (sender_id, receiver_id, message) VALUES ($1, $2, $3)",
    [senderId, receiverId, message],
  );
}

module.exports = {
  containsUser,
  insertUser,
  getUserById,
  getAllListings,
  getListingsByCourseCode,
  getListingsBySearchTerm,
  getListingsByUserId,
  getIdByUser,
  deleteListing,
  createListing,
  getMessagesByReceiverId,
  createMessage
};
