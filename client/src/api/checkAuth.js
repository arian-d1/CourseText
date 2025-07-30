import axios from "./axios";

export async function checkAuth() {
  try {
    const response = await axios.get("/log-in", {
      withCredentials: true,
    });
    return response
  } catch (error) {
    console.error("checkAuth error", error);
    return null;
  }
}
