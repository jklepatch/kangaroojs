'use strict';

process.env.NODE_ENV = 'test';

const path = require('path');
const config = require('../../../../config');
const server = require(config.app.path);
const models = require(path.join(config.app.path, 'models'));
const User = models.user
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const agent = chai.request.agent(server);
const request = chai.request(server);

describe('Session routes', function() {

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

  it('Should not login a non-existing user (non-existing user)', function(done) { 
    agent
      .post('/login')
      .send({email: 'adminn@admin.com', password: '00000000'})
      .then(function(res) {
        expect(res.text).to.have.string('Login');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should not login a user with wrong password', function(done) { 
    request
      .post('/login')
      .send({email: 'admin@admin.com', password: '0000000'})
      .then(function(res) {
        expect(res.text).to.have.string('Login');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should login a user with correct email and password', function(done) { 
    agent
      .post('/login')
      .send({email: 'admin@admin.com', password: '00000000'})
      .then(function(res) {
        expect(res.text).to.have.string('You successfully logged-in.');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should sign-out a logged-in user', function(done) { 
    agent
      .get('/signout')
      .then(function(res) {
        expect(res.text).to.have.string('You have signed-out.');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

});