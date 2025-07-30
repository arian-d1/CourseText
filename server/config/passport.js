const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/pool");
const bcrypt = require("bcrypt");

const verifyCallback = async (username, password, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    const user = rows[0];
    console.log(user);
    if (!user) {
      return done(null, false, { message: "Incorrect password" });
    }

    const pwCmpr = await bcrypt.compare(password, user.password);
    if (!pwCmpr) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
