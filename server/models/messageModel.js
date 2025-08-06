const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function getMessagesByReceiverId(receiverId) {
  try {
    const response = await db.getMessagesByReceiverId(receiverId);
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = { getMessagesByReceiverId };
