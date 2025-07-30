import axios from "./axios";

  export async function checkAuth() {
    try {
        const response = await axios.get("/log-in", {
          withCredentials: true,
        });
        console.log(response.data.state)
        return response.data.state;
      } catch (error) {
        console.error("checkAuth error", error);
        return false;
      }
    }
