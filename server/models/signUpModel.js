const bcrypt = require("bcrypt");
const dbQueries = require("../../server/db/queries");

async function addNewUser(username, password) {
  try {
    if (await dbQueries.containsUser(username)) {
      return false;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await dbQueries.insertUser(username, hashedPassword);
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addNewUser };
