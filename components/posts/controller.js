/* jshint esversion: 8 */
const store = require('./store');

async function getPosts(limit = 20, offset = 0) {
  return new Promise(async (resolve, reject) => {
    try {
      let postAll = await store.getPosts();
      if(!postAll.error){
        let posts = postAll.posts.data.slice(offset, limit+offset);
        resolve(posts);
        return;
      } else {
        reject(postAll.message);
        return;  
      }
    } catch (error) {
      reject(error);
      return;
    }
  });
}

module.exports = {
  getPosts
};