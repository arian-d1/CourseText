const { Client } = require("pg");
require("dotenv").config();

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const SQL = `
CREATE TABLE IF NOT EXISTS users (
   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   username TEXT,
   password TEXT
);

CREATE TABLE IF NOT EXISTS listings (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   title TEXT,
   description TEXT,
   price NUMERIC(7, 2),
   user_id INT,
   FOREIGN KEY (user_id) REFERENCES users(id)
);`;

async function main() {
  try {
    console.log("Connecting...");
    await db.connect();
    await db.query(SQL);
    const res = await db.query("SELECT * FROM users;");
    console.table(res.rows);
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await db.end();
    console.log("Done.");
  }
}

main();
