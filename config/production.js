'use strict';

const path = require('path');

const productionConfig = {
  app: {
    protocol: 'http',
    host: 'production.url.here',
    port: 3000,
    url: 'http://production.url.here:3000'
  },
  db: {
    logging: false
  }
};

module.exports = productionConfig;