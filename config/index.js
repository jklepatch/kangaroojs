'use strict';

/**
 * Populates application config object
 * 
 * First, NODE_ENV and sensitive data are read from .env file
 * Then, a default config is read
 * Finally, an environment-specific configuration file overwrite 
 * the default configuration.
 * ex: if NODE_ENV=PRODUCTION, config variables in `production.js` will 
 * override `default.js`
 * 
 * @module Config
 */

const _ = require("lodash");
const dotEnv = require('dotenv');

// Reads `.env` file and populate environment variables in `process.env`
dotEnv.config();

//The default configuration
const defaults = require("./default.js");

//The environment-specific configuration
const config = require("./" + (process.env.NODE_ENV || "development") + ".js");

//config fields defined in environment-specific file overrides defaults
module.exports = _.merge({}, defaults, config);