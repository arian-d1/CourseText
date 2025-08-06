const messageModel = require("../models/messageModel");
const { validationResult } = require("express-validator");

async function getMessagesByReceiverId(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const receiverId = req.params.receiverId;
    const response = await messageModel.getMessagesByReceiverId(receiverId);
    res.json({ success: true, messages: response });
  } catch (error) {
    res.json({
      success: false,
      error: error.message || "Error fetching messages by receiver ID",
    });
  }
}

module.exports = { getMessagesByReceiverId };
