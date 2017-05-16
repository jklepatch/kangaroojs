'use strict';

/**
 * Bootstrap the application
 */

const express = require('express');
const config = require('../../config');
const db = require('./models');
const middlewares = require('./middlewares');
const configureViews = require('./views.js');
const routes = require('./routes.js');
const app = express();

configureViews(app);
app.use(middlewares);
app.use(routes);

app.listen(config.app.port, function() {
  console.log('App running on port ' + config.app.port);
})

//Useful for testing
module.exports = app;

