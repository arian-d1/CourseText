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
   code TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   user_id INT,
   FOREIGN KEY (user_id) REFERENCES users(id)
);


INSERT INTO listings (title, description, price, code, user_id) VALUES ('Title 1', 'desc 1', 1.25, 'CPSC101', 1) ON CONFLICT DO NOTHING;
INSERT INTO listings (title, description, price, code, user_id) VALUES ('Title 2', 'desc 2', 2.25, 'CPSC201', 1) ON CONFLICT DO NOTHING;
INSERT INTO listings (title, description, price, code, user_id) VALUES ('Title 3', 'desc 3', 3.25, 'CPSC301', 1) ON CONFLICT DO NOTHING;
INSERT INTO listings (title, description, price, code, user_id) VALUES ('Title 4', 'desc 4', 4.25, 'CPSC401', 1) ON CONFLICT DO NOTHING;
INSERT INTO listings (title, description, price, code, user_id) VALUES ('Title 5', 'desc 5', 5.25, 'CPSC501', 1) ON CONFLICT DO NOTHING;

`;

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
