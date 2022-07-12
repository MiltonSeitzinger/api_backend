/* jshint esversion: 8 */
const User = require('./model');

async function getUserByEmail(email){
  try {
    let user = await User.findOne({email});
    return user;
  } catch (error) {
    console.log('error', error);
  }
}

async function addUser(user) {
    const newUser = new User(user);
    let new_user = await newUser.save()
    .then((user) => {
      return {add: true, user };
    })
    .catch((err) => {
      return {add: false, err };
    });
    return new_user;
}

async function getUsers(){
  let users = await User.find();
  return users;
}


module.exports = {
  getUserByEmail,
  addUser,
  getUsers
};