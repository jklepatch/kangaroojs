'use strict';

const testConfig = {
  app: {
    protocol: 'http',
    host: 'localhost',
    port: 3010,
    url: 'http://localhost:3010'
  },
  db: {
    logging: false,
    host: 'localhost',
	  username: 'root',
	  password: '',
	  name: 'os_kangaroojs_test'
  }
};

module.exports = testConfig;