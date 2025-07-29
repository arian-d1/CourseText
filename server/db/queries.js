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

module.exports = { containsUser, insertUser };
