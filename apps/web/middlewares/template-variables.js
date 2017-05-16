'use strict';

/**
 * Make variables available in hbs templates
 * @module template-variables
 */

const router = require('express').Router();
const config = require('../../../config');

router.use(function (req, res, next){
  res.locals.session = req.session;
  res.locals.reqUrl = req.url;
  res.locals.appUrl = config.app.protocol + '://' + config.app.host + ':' + config.app.port;
  res.locals.env = process.env.NODE_ENV;
  res.locals.isProd = (process.env.NODE_ENV === 'production') ? true : false;
  res.locals.isAdmin = (req.session && req.session.user && req.session.user.role === 'admin') ? true : false;
  next();
});

module.exports = router;