'use strict';

/*
 * Configuration file for sequelize-cli
 * It's not possible to configure sequelize to use 
 * the app configuration system. So we need to add 
 * this configuration file only for sequelize-cli
 */

const dotEnv = require('dotenv');
dotEnv.config();

const config = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host":     process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host":     process.env.DB_HOST,
    "dialect": "mysql"
  },
  "staging": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host":     process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host":     process.env.DB_HOST,
    "dialect": "mysql"
  }
};

module.exports = config;
