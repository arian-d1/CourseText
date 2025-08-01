import axios from "./axios";

async function getAllListings() {
  try {
    return await axios.get("/listings");
  } catch (error) {
    console.error(error);
  }
}

async function getListingsByCourseCode(courseCode) {
  try {
    return await axios.get(`/listings/code/${courseCode}`);
  } catch (error) {
    console.error(error);
  }
}

async function getListingsBySearchTerm(searchTerm) {
  try {
    return await axios.get(`/listings/term/${searchTerm}`);
  } catch (error) {
    console.error(error);
  }
}

async function getUserNameByID(id) {
  try {
    return await axios.get(`/users/${id}`);
  } catch (error) {
    console.error(error);
  }
}

async function getListingsById(id) {
  try {
    return await axios.get(`/listings/id/${id}`);
  } catch (error) {
    console.error(error);
  }
}

async function deleteListing(id) {
  try {
    return await axios.delete(`/listings/delete/${id}`);
  } catch (error) {
    console.error(error);
  }
}

async function createListing(listingData) {
  try {
    return await axios.post("/listings", listingData);
  } catch (error) {
    console.error(error);
  }
}

export {
  getAllListings,
  getListingsByCourseCode,
  getListingsBySearchTerm,
  getUserNameByID,
  getListingsById,
  deleteListing,
  createListing,
};
