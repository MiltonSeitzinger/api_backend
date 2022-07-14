/* jshint esversion: 8 */
const request = require("supertest");
const app = require("../server");
const should = require("should");

let numbers = "0123456789";
let caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let password = "";
let password2 = "";

for (let i = 0; i < 10; i++) {
  password += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  password2 += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
}

let mergeNumber = "";
for (let i = 0; i < 3; i++) {
  mergeNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
}

let email = `email${mergeNumber}@email.com`;
let email2 = `email${mergeNumber}bis@email.com`;
let emailInvalido = `email${mergeNumber}email.com`;

let user = {
  email: email,
  password: password,
};

describe("POST /api/users/add_user", () => {
  it("Probando sin datos en agregar nuevo usuario", (done) => {
    request(app)
      .post("/api/users/add_user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("Falta email o password");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Probando sin email en agregar nuevo usuario", (done) => {
    let user = {
      password,
    };
    request(app)
      .post("/api/users/add_user")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("Falta email o password");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Probando sin password en agregar nuevo usuario", (done) => {
    let user = {
      email,
    };
    request(app)
      .post("/api/users/add_user")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("Falta email o password");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Formato de email inválido en agregar nuevo usuario", (done) => {
    let user = {
      email: emailInvalido,
      password,
    };
    request(app)
      .post("/api/users/add_user")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("Formato de email inválido");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Registrar el email", (done) => {
    request(app)
      .post("/api/users/add_user")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.length.should.equal(167);
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Email ya registrado", (done) => {
    request(app)
      .post("/api/users/add_user")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("El email ya se encuentra registrado");
        res.body.error.should.equal(false);
        done();
      });
  });
});

/* LOGIN USER */
describe("POST /api/users/login", () => {
  it("Probando sin datos de login", (done) => {
    request(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("Falta email o password");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Probando sin email en el login", (done) => {
    let user = {
      password,
    };
    request(app)
      .post("/api/users/login")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("Falta email o password");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Probando sin password en el login", (done) => {
    let user = {
      email,
    };
    request(app)
      .post("/api/users/login")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("Falta email o password");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Formato de email inválido en el login", (done) => {
    let user = {
      email: emailInvalido,
      password,
    };
    request(app)
      .post("/api/users/login")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("Formato de email inválido");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("No está registrado el email", (done) => {
    let user = {
      email: email2,
      password,
    };
    request(app)
      .post("/api/users/login")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("No existe el email");
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Login correcto", (done) => {
    request(app)
      .post("/api/users/login")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.length.should.equal(167);
        res.body.error.should.equal(false);
        done();
      });
  });

  it("Login con password incorrecta", (done) => {
    user.password = password2;
    request(app)
      .post("/api/users/login")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.message.should.equal("Contraseña incorrecta");
        res.body.error.should.equal(false);
        done();
      });
  });
});

describe("Endpoint no existente", () => {
  it("No existe el endpoint", (done) => {
    let path = "/enpoint/notfound/";
    request(app)
      .get(path)
      .set("Accept", "application/json")
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });
});
