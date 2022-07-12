/* jshint esversion: 8 */
const request = require('supertest');
const app = require('../server');
const should = require('should');

let numbers = "0123456789";
let caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let password = '';
for (let i=0; i<10; i++) {
  password +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
} 
let mergeNumber='';
for (let i=0; i<3; i++) {
  mergeNumber +=numbers.charAt(Math.floor(Math.random()*numbers.length)); 
} 
let email = `email${mergeNumber}@email.com`;
let emailInvalido = `email${mergeNumber}email.com`;
let user = {
  email: email, 
  password: password
};
/* LOGIN USER */
describe('POST /api/users/login', () => {
  it('Probando sin datos de login', done => {
		request(app)
			.post('/api/users/login')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if(err) return done(err);
				res.status.should.equal(200);
				res.body.message.should.equal('Falta email o password');
				res.body.error.should.equal(false);
				done();
		});
	});
  it('Probando sin email en el login', done => {
		request(app)
			.post('/api/users/login')
			.send({ password: password})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if(err) return done(err);
				res.status.should.equal(200);
				res.body.message.should.equal('Falta email o password');
				res.body.error.should.equal(false);
				done();
		});
	});
  it('Probando sin password en el login', done => {
		request(app)
			.post('/api/users/login')
			.send({ email: email})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if(err) return done(err);
				res.status.should.equal(200);
				res.body.message.should.equal('Falta email o password');
				res.body.error.should.equal(false);
				done();
		});
	});
  it('Formato de email inválido en el login', done => {
    let user = {
      email: emailInvalido, 
      password: password
    };
		request(app)
			.post('/api/users/login')
			.send({user})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if(err) return done(err);
				res.status.should.equal(200);
				res.body.message.should.equal('Formato de email inválido');
				res.body.error.should.equal(false);
				done();
		});
	});
  it('No está registrado el email', done => {
		request(app)
			.post('/api/users/login')
			.send({user})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if(err) return done(err);
				res.status.should.equal(200);
				res.body.message.should.equal('No existe el email');
				res.body.error.should.equal(false);
				done();
		});
	});

	/* 
	it('Usuario registrado completo', done => {
		request(app)
			.post('/api/user/login')
			.send({ email: 'aaa@gmail.com'})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				res.status.should.equal(200)
				res.body.message.token.length.should.equal(204)
				done()
			})
		})
	})
describe('Endpoint no existente', () => { 
	it('No existe el endpoint', done => {
		let path = '/enpoint/notfound/';
		request(app)
		.get(path)
		.set('Accept', 'application/json')
		.expect(404)
		.end((err, res) => {
			if(err) {return done(err);} else {
			done();
      }
		});
	});
 */
});