// IMPORTS
const express = require("express");
const path = require("node:path");
require("dotenv").config();
const cors = require("cors");

// AUTH IMPORTS
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./config/passport");
const db = require("./db/pool");

// ROUTER IMPORTS
const loginRouter = require("./routes/loginRouter");
const signUpRouter = require("./routes/signUpRouter");
const listingsRouter = require("./routes/listingsRouter");
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://course-text.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: db,
      tableName: "session",
    }),
    cookie: {
      secure: true, // required on HTTPS
      sameSite: "none", // required for cross-site cookies
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); // will parse json in to req.body
app.use(express.urlencoded({ extended: true }));

// ROUTERS
app.get("/", (req, res) => {
  res.json({ message: "message" });
});

app.use("/api/log-in", loginRouter);
app.use("/api/sign-up", signUpRouter);
app.use("/api/listings", listingsRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening @ PORT ${PORT}`);
});
