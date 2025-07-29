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

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
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
app.use(express.json()); // Add this before your routes
app.use(express.urlencoded({ extended: true }));

// Serve static files from client/public
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// View Engine EJS
app.set("views", path.join(__dirname, "..", "client", "views"));
app.set("view engine", "ejs");

// ROUTERS
app.get("/", (req, res) => {
  res.redirect("/sign-up");
});

app.use("/api/log-in", loginRouter);
app.use("/api/sign-up", signUpRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening @ PORT ${PORT}`);
});
