const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL, // Neon connection string
  ssl: {
    rejectUnauthorized: false, // required for Neon/Vercel Postgres
  },
});

module.exports = db;