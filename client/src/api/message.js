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

export { getMessagesByReceiverId };