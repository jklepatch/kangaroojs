'use strict';

process.env.NODE_ENV = 'test';

const server = require('../index.js');
const models = require('./index.js');
const expect = require('chai').expect;
const User = models.user;

describe('User Model', function() {

  beforeEach(function (done) {
    models.sequelize.sync({force: true})
    .then(function () {
      done();
    })
    .catch(function (error) {
      console.log(error);
      done();
    });
  })

  it('Should not create 2 users with same email', function(done) {
    User.create({
      email:    'bob@bob.com',
      password: '000000000',
      role:     'member'
    })
    .then(function (user) {
      return User.create({
        email:    'bob@bob.com',
        password: '000000000',
        role:     'member'
      });
    })
    .catch(function (error) {
      expect(error.message).to.equal('This email is already used. Please choose another one.');
      done();
    })
  });

  it('Should not create a user with a password below 8 characters', function(done) {
    User.create({
      email:    'bob@bob.com',
      password: '0000000',
      role:     'member'
    })
    .catch(function (error) {
      expect(error.message).to.equal('Validation error: Password must be 8 characters or more.');
      done();
    });
  });

  it('Should create a user with a password of 8 characters', function(done) {
    User.create({
      email:    'bob@bob.com',
      password: '00000000',
      role:     'member'
    })
    .then(function (user) {
      expect(user.get().email).to.equal('bob@bob.com');
      done();
    })
  });

  it('Should not create a user with a role not in [member|admin]', function(done) {
    User.create({
      email:    'bob@bob.com',
      password: '00000000',
      role:     'another-role'
    })
    .then(function(user) {console.log(user); done();})
    .catch(function (error) {
      expect(error.message).to.equal('Validation error: Role must be either member or admin.');
      done();
    })
  });
});