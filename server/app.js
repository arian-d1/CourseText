const express = require("express");
const path = require("node:path");
require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: true }));

// View Engine EJS
app.set("views", path.join(__dirname, "..", "client", "views"));
app.set("view engine", "ejs");

// ROUTERS
app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening @ PORT ${PORT}`);
});
