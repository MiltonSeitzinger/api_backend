/* jshint esversion: 8 */
const store = require('./store');

async function getPhotos(limit = 10, offset = 0) {
  return new Promise(async (resolve, reject) => {
    try {
      let photosAll = await store.getPhotos();
      if(!photosAll.error){
        let photos = photosAll.photos.data.slice(offset, limit+offset);
        resolve(photos);
        return;
      } else {
        reject(photosAll.message);
        return;  
      }
    } catch (error) {
      reject(error);
      return;
    }
  });
}

module.exports = {
  getPhotos
};