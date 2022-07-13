/* jshint esversion: 8 */
const axios = require('axios');
let urlPosts = 'https://jsonplaceholder.typicode.com/posts';

async function getPosts(){
  try {
    let posts = await axios.get(urlPosts);
    return { posts, error: false };
  } catch (error) {
    return { error: true, message: error };
  }
}

module.exports = {
  getPosts
};