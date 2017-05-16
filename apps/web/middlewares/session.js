'use strict';

/**
 * Save sessions between request
 * Use in-memory store for dev, and redis for prod
 * @module session
 */

const router = require('express').Router();
const expressSession = require('express-session');
const config = require('../../../config');
const session = expressSession({
  // store: sessionStore,
  secret: config.session.secret, 
  resave: false, 
  saveUninitialized: false,
  secure: config.session.secure,
});
router.use(session);

module.exports = router;
