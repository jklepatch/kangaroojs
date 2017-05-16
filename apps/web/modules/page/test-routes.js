'use strict';

process.env.NODE_ENV = 'test';

const config = require('../../../../config');
const server = require(config.app.path);
const chai = require('chai');
const expect = chai.expect;

const request = chai.request(server);

describe('Page routes', function() {

  it('Should render home page', function(done) { 
    request
      .get('/')
      .then(function(res) {
        expect(res.text).to.have.string('Home Page');
        done();
      })
      .catch(function (err) {
        throw err;
        done();
      });
  });

});