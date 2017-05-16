'use strict';

process.env.NODE_ENV = 'test';

const config = require('../../../../../config');
const path = require('path');

const server = require(config.app.path);
const models = require(path.join(config.app.path, 'models'));
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const User = models.user;


chai.use(chaiHttp);

const agent = chai.request.agent(server);
const request = chai.request(server);

describe('User/admin routes', function() {

  /*
   * Before all tests:
   *   - We wipe out the database
   *   - We create an admin user
   *   - We sign-in the admin user
   *   - Requests using `agent` will be logged-in
   *   - Requests using `chai.request will not be logged-in
   */
  before(function (done) {
    //Fixes some timeout errors when computer is busy
    this.timeout(3000);
    models.sequelize.sync({force: true})
      .then(function () {
        return Promise.all[
          User.create({
            email: 'admin@admin.com',
            password: '00000000',
            role: 'admin'
          }),
          User.create({
            email: 'updateme@updateme.com',
            password: '00000000',
            role: 'member'
          })
        ];
      })
      .then(function (user) {
        return agent
          .post('/login')
          .send({email: 'admin@admin.com', 'password': '00000000' })
      })
      .then(function (res) {
        done();
      })
      .catch(function (error) {
        console.log(error);
        done();
      });
  });

  it('Should let an admin access to `/admin/users`', function(done) { 
    agent
      .get('/admin/users')
      .then(function(res) {
        expect(res.text).to.have.string('Admin > Users');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should redirect a non-admin who try to access `/admin/users` to `/login`', function(done) { 
    chai.request(server)
      .get('/admin/users')
      .then(function(res) {
        expect(res.redirects[0]).to.have.string('/login');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should render /admin/new', function(done) { 
    agent
      .get('/admin/users/new')
      .then(function (res) {
        expect(res.text).to.have.string('Create new user');
        expect(res).to.have.status(200);
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should create a new user', function(done) { 
    agent
      .post('/admin/users')
      .send({email: 'foo@foo.com', password: '11111111', role: 'member'})
      .then(function (res) {
        expect(res.text).to.have.string('User foo@foo.com created.');
        expect(res).to.have.status(200);
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should render /admin/users/1/edit', function(done) { 
    agent
      .get('/admin/users/1/edit')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Edit user admin@admin.com');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should not render /admin/users/10/edit', function(done) { 
    agent
      .get('/admin/users/10/edit')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('User 10 does not exist.');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should update a user', function(done) { 
    agent
      .post('/admin/users/2')
      .send({email: 'updateme@updateme.com', password: '11111111', role: 'member'})
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('User 2 updated.');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should not update a non-existing user', function(done) { 
    agent
      .post('/admin/users/10')
      .send({email: 'updateme@updateme.com', password: '11111111', role: 'member'})
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('User 10 does not exist.');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should not render /admin/users/1/edit for non-admin', function(done) { 
    request
      .get('/admin/users/1/edit')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Login');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should not let a non-admin update a user', function(done) { 
    request
      .post('/admin/users/1')
      .send({email: 'updateme@updateme.com', password: '11111111', role: 'member'})
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Login');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should not delete a non-existing user', function(done) { 
    agent
      .post('/admin/users/4/destroy')
      .then(function (res) {
        expect(res.text).to.have.string('Cannot delete user 4. User not found.');
        expect(res).to.have.status(200);
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

});