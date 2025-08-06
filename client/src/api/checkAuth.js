import axios from "./axios";
export async function checkAuth() {
  try {
    const response = await axios.get("/log-in", {
      withCredentials: true,
    });
    
    return response;
  } catch (error) {
    console.error("checkAuth error", error);
    return null;
  }
}

export async function logOut() {
  try {
    const response = await axios.post(
      "/users/logout",
      {},
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("logOut error", error);
    return null;
  }
}
