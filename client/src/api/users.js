import axios from "../api/axios";

async function getIdByUser(username) {
  try {
    const response = await axios.get(`/users/id/${username}`, {});
    return response.data.id;
  } catch (error) {
    console.error("Error fetching ID by username:", error);
    throw error;
  }
}

export { getIdByUser };
