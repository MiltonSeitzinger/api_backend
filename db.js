/* jshint esversion: 8 */
const db = require("mongoose");

db.Promise = global.Promise;

async function connect(url) {
  await db.connect(url, {
    useNewUrlParser: true, //Nos aseguramos que no haya ningun problema de compatibilidad entre versiones de servidores.
    useUnifiedTopology: true,
  });
  console.log("[db] conectada con exito: ", url);
}

module.exports = connect;
