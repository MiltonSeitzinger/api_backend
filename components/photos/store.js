/* jshint esversion: 8 */
const axios = require("axios");
let urlPhotos = "https://jsonplaceholder.typicode.com/photos";

async function getPhotos() {
  try {
    let photos = await axios.get(urlPhotos);
    return { photos, error: false };
  } catch (error) {
    return { error: true, message: error };
  }
}

module.exports = {
  getPhotos,
};
