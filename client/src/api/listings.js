import axios from "./axios";

async function getListings() {
  try {
    return await axios.get("/listings");
  } catch (error) {
    console.error(error);
  }
}

export { getListings };
