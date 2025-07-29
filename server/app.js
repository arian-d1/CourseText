// IMPORTS
const express = require("express");
const path = require("node:path");
require("dotenv").config();

// AUTH IMPORTS
const session = require("express-session");
const passport = require("./config/passport");

// ROUTER IMPORTS
const loginRouter = require("./routes/loginRouter");
const signUpRouter = require("./routes/signUpRouter");

const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 60 * 1000, // 15 minutes
    },
  }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// View Engine EJS
app.set("views", path.join(__dirname, "..", "client", "views"));
app.set("view engine", "ejs");

// ROUTERS
app.get("/", (req, res) => {
  res.redirect("/sign-up");
});

app.use("/log-in", loginRouter);
app.use("/sign-up", signUpRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening @ PORT ${PORT}`);
});
