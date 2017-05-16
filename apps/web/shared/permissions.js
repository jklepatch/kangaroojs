'use strict';

/*
 * @module permissions
 */

const authenticated = function (req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
    res.end();
  }
};

const isAdmin = function (req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.redirect('/login');
    res.end();
  }
};

module.exports = {
  authenticated: authenticated,
  isAdmin: isAdmin
};


