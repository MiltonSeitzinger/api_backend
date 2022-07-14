/* jshint esversion: 8 */
const store = require("./store");
const auth = require("../../services/auth");

function formatEmailValid(email) {
  let regex_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (regex_email.test(email)) {
    return true;
  } else {
    return false;
  }
}

async function addUser(user) {
  return new Promise(async (resolve, reject) => {
    if (!user || !user.email || !user.password) {
      resolve("Falta email o password");
      return;
    }
    try {
      const { email } = user;
      let isEmailValid = formatEmailValid(email);
      if (!isEmailValid) {
        resolve("Formato de email inválido");
        return;
      }

      let exists = await store.getUserByEmail(email);
      if (exists) {
        resolve("El email ya se encuentra registrado");
        return;
      }
      let newUser = await store.addUser(user);
      if (newUser.add) {
        let token = auth.generateToken(email);
        if (!token.error) {
          resolve(token);
        } else {
          reject(token.error);
        }
        return;
      } else {
        console.log(newUser);
        reject("Hubo problemas para guardar el nuevo usuario");
        return;
      }
    } catch (error) {
      reject(error);
      return;
    }
  });
}

async function getUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await store.getUsers();
      resolve(users);
      return;
    } catch (error) {
      reject(error);
      return;
    }
  });
}

async function loginUser(user) {
  return new Promise(async (resolve, reject) => {
    if (!user || !user.email || !user.password) {
      resolve("Falta email o password");
      return;
    }
    try {
      const { email, password } = user;
      let isEmailValid = formatEmailValid(email);
      if (!isEmailValid) {
        resolve("Formato de email inválido");
        return;
      }

      let userByEmail = await store.getUserByEmail(email);
      if (userByEmail) {
        userByEmail.comparePassword(password, (err, isMatch) => {
          if (err) {
            reject(err);
            return;
          } else {
            if (isMatch) {
              let token = auth.generateToken(email);
              if (!token.error) {
                resolve(token);
              } else {
                reject(token.error);
              }
              return;
            } else {
              resolve("Contraseña incorrecta");
              return;
            }
          }
        });
      } else {
        resolve("No existe el email");
        return;
      }
    } catch (error) {
      reject(error);
      return;
    }
  });
}

module.exports = {
  addUser,
  getUsers,
  login: loginUser,
};
