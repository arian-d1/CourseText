// IMPORTS
const express = require("express");
const path = require("node:path");
require("dotenv").config();
const cors = require("cors");

// AUTH IMPORTS
const session = require("express-session");
const passport = require("./config/passport");

// ROUTER IMPORTS
const loginRouter = require("./routes/loginRouter");
const signUpRouter = require("./routes/signUpRouter");
const listingsRouter = require("./routes/listingsRouter");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 60 * 1000, // 15 minutes
    },
  }),
);

app.use(passport.session());
app.use(express.json()); // will parse json in to req.body
app.use(express.urlencoded({ extended: true }));

// ROUTERS
app.get("/", (req, res) => {
  res.redirect("/sign-up");
});

app.use("/api/log-in", loginRouter);
app.use("/api/sign-up", signUpRouter);
app.use("/api/listings", listingsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening @ PORT ${PORT}`);
});
