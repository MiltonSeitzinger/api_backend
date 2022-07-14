/* jshint esversion: 8 */
const request = require("supertest");
const app = require("../server");
const should = require("should");

let numbers = "0123456789";
let caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let password = "";

for (let i = 0; i < 10; i++) {
  password += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
}

let mergeNumber = "";
for (let i = 0; i < 3; i++) {
  mergeNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
}

let email = `email${mergeNumber}@email.com`;

let user = {
  email: email,
  password: password,
};

let token = "";

/* Generar un registro de email para obtener el token */
describe("POST /api/users/add_user", () => {
  it("Registrar el email", (done) => {
    request(app)
      .post("/api/users/add_user")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.message;
        done();
      });
  });
});

describe("POST /api/posts/", () => {
  it("Test sin token en la peticion", (done) => {
    request(app)
      .post("/api/posts/")
      .set("Accept", "application/json")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(401);
        res.body.message.should.equal("No tienes autorización");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Test con token en la peticion por default (offset y limit)", (done) => {
    request(app)
      .post("/api/posts/")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.length.should.equal(20);
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Test con offset como parametro y limit por default", (done) => {
    let offset = 15;
    let primer_elemento = 0;
    request(app)
      .post("/api/posts/")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ offset })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.length.should.equal(20);
        res.body.message[primer_elemento].id.should.equal(offset);
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Test con limit como parametro y offset por default", (done) => {
    let limit = 15;
    request(app)
      .post("/api/posts/")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ limit })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.length.should.equal(limit);
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Test con limit y offset como parametro", (done) => {
    let limit = 15;
    let offset = 4;
    let primer_elemento = 0;
    request(app)
      .post("/api/posts/")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ limit, offset })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.length.should.equal(limit);
        res.body.message[primer_elemento].id.should.equal(offset);
        res.body.error.should.equal(false);
        done();
      });
  });
});
