import axios from "../api/axios";

async function getMessagesByReceiverId(receiverId) {
  try {
    const response = await axios.get(`/messages/${receiverId}`);
    return response;
  } catch (error) {
    console.error("Error fetching messages by receiver ID:", error);
    throw error;
  }
}

async function createMessage(sender_id, receiver_id, message) {
  try {
    const response = await axios.post("/messages/", {
      sender_id,
      receiver_id,
      message,
    });
    return response;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
}

export { getMessagesByReceiverId, createMessage };
