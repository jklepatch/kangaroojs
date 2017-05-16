'use strict';

process.env.NODE_ENV = 'test';

const config = require('../../../../config');
const server = require(config.app.path);
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const agent = chai.request.agent(server);
const request = chai.request(server);

describe('Error routes', function() {

  it('Should redirect non-existing route to 404', function(done) { 
    request
      .get('/i-dont-exist')
      .then(function(res) {
        expect(res.text).to.have.string('Ooops, this page doesn\'t exits...');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should not redirect existing route to 404', function(done) { 
    request
      .get('/')
      .then(function(res) {
        expect(res.text).to.not.have.string('Ooops, this page doesn\'t exits...');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should render /notfound with error message', function(done) { 
    agent
      .post('/flash/error/foo')
      .then(function(res) {
        return agent.get('/notfound');
      })
      .then(function(res) {
        expect(res.text).to.have.string('Ooops, this page doesn\'t exits...');
        expect(res.text).to.have.string('foo');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should render /error without error message', function(done) { 
    request
      .get('/error')
      .then(function(res) {
        expect(res.text).to.have.string('Ooops...that\'s an error...');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

  it('Should render /error with error message', function(done) { 
    //First POST request creates a flash with type `error` and message value `test`
    agent
      .post('/flash/error/test')
      .then(function(res) {
        return agent.get('/error');
      })
      .then(function(res) {
        expect(res.text).to.have.string('Ooops...that\'s an error...');
        expect(res.text).to.have.string('test');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

});