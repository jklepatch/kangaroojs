'use strict';

/*
 * Login, logout and create new user
 * @module session
 */

const path = require('path');
const router = require('express').Router();
const Session = require('./model.js');
const config = require('../../../../config')
const appPath = config.app.path;
const models = require(path.join(appPath, 'models'));
const User = models.user;

const newSession = function (req, res) {
  res.render('session/view-new.hbs', {layout: 'focus.hbs'});
};

const createSession = function (req, res) {
  User.findOne({where: {email: req.body.email}})
    .then(function (user) {
      if(!user || !user.verifyPassword(req.body.password)) {
        res.flash('error', 'Ooops...You entered an incorrect email or password...');
        res.redirect('/login');
        return;
      }
      Session.login(req, res, user.get());  res.cookie('test', req.session.id);
      res.flash('success', 'You successfully logged-in.')
      res.redirect('/');
    });
};

const destroySession = function(req, res) {
  Session.signOut(req, res);
  res.flash('success', 'You have signed-out.');
  res.redirect("/login");
};

router.get( '/login'  , newSession);
router.post('/login'  , createSession);
router.get( '/signout', destroySession);
 
module.exports = router;