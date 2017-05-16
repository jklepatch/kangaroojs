'use strict';

process.env.NODE_ENV = 'test';

const path = require('path');
const config = require('../../../../../config');
const server = require(config.app.path);
const models = require(path.join(config.app.path, 'models'));
const User = models.user
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const agent = chai.request.agent(server);
const request = chai.request(server);

describe('User/public routes', function () {

 /*
   * Before all tests:
   *   - We wipe out the database
   *   - We create an admin user
   */
  before(function (done) {
    //Fixes some timeout errors when computer is busy
    this.timeout(3000);
    models.sequelize.sync({force: true})
      .then(function () {
        return User.create({
          email: 'admin@admin.com',
          password: '00000000',
          role: 'admin'
        });
      })
      .then(function (res) {
        done();
      })
      .catch(function (error) {
        console.log(error);
        done();
      });
  });

  it('Should render /users', function(done) { 
    request
      .get('/users')
      .then(function (res) {
        expect(res.text).to.have.string('All Users');
        expect(res.text).to.have.string('admin@admin.com');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should render /signup', function(done) { 
    request
      .get('/signup')
      .then(function (res) {
        expect(res.text).to.have.string('Sign-up');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should render /users/:id of an existing user', function(done) { 
    request
      .get('/users/1')
      .then(function (res) {
        expect(res.text).to.have.string('Showing User <b>admin@admin.com</b>');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should redirect /users/:id of a non-existing user to 404', function(done) { 
    agent
      .get('/users/2')
      .then(function (res) {
        expect(res.text).to.have.string('User 2 does not exist.');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

});