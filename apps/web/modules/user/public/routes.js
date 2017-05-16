'use strict';

const router = require('express').Router();
const path = require('path');
const config = require('../../../../../config');
const models = require(path.join(config.app.path, 'models'));
const User = models.user;

const indexUser = function (req, res) {
  User.findAll()
  .then(function (users) {
    res.render('user/public/view-index.hbs', {users: users});
  })
  .catch(function (error) {
    res.flash('error', error.message);
    res.redirect('/error');
  });
};

const newUser = function (req, res) {
  res.render('user/public/view-new.hbs', {layout: 'focus.hbs'});
};

const createUser = function (req, res) {
  User.create({
    email: req.body.email,
    password: req.body.password,
    role: 'member'
  })
  .then(function (user) {
    res.render('user/public/view-show.hbs', {user: user});
  })
  .catch(function (error) {
    res.flash('error', error.message);
    res.redirect('/signup');
  });
};

const showUser = function (req, res) {
  User.findById(req.params.id)
    .then(function (user) {
      if(user === null) {
        res.flash('error', 'User ' + req.params.id + ' does not exist.');
        res.redirect('/notfound');
        return;
      }
      res.render('user/public/view-show.hbs', {user: user});
    })
    .catch(function (error) {
      res.flash('error', error.message);
      res.redirect('/error');
    })
};

router.get('/users', indexUser);
router.get('/signup', newUser);
router.post('/signup', createUser);
router.get('/users/:id', showUser);

module.exports = router;