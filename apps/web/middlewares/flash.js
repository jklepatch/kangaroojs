'use strict';

/**
 * Custom flash implementation, using `express-session`
 * @module flash
 */

const router = require('express').Router();

router.use(function(req, res, next){
  // if there's a flash message in the session, make it available as a template variable
  res.locals.flash = req.session.flash;
  res.flash = function (type, message) {
    req.session.flash = {
      type: type,
      message: message
    };
  };
  //Delete the flash so that it doesn't appear again in next request
  delete req.session.flash;
  next();
});

module.exports = router;