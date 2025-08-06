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

async function createMessage(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sender_id, receiver_id, message } = req.body;
    const response = await messageModel.createMessage(
      sender_id,
      receiver_id,
      message,
    );
    res.json({ success: true, message: response });
  } catch (error) {
    res.json({
      success: false,
      error: error.message || "Error creating message",
    });
  }
}

module.exports = { getMessagesByReceiverId, createMessage };
