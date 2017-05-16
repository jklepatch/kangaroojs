'use strict';

const stagingConfig = {
  app: {
    protocol: 'http',
    host: 'staging.url.here',
    port: 3000,
    url: 'http://staging.url.here:3000'
  },
  db: {
    logging: false
  }
};

module.exports = stagingConfig;