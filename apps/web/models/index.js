'use strict';

/*
 * Loads all models and make them available in the sequelize object
 * @module models
 */

const config = require('../../../config');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  config.db.name, 
  config.db.username, 
  config.db.password, 
  config.db
);
var db = {};

/*
 * Find all models and put them in an array:
 * - Filter all files inside the current folder which arent dot files, aren't index.js(this file) and aren't tests.
 * - Remaining files are the models to be loaded
 */
fs
  .readdirSync(__dirname)
  .filter(function(file) { 
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file.indexOf('test') === -1);
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Configure associations between models
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;