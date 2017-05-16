'use strict';

const router = require('express').Router();
const path = require('path');
const config = require('../../../../../config');
const isAdmin = require(path.join(config.app.path, 'shared/permissions.js')).isAdmin;
const models = require(path.join(config.app.path, 'models'));
const User = models.user;

const indexUser = function(req, res) {
  User.findAll()
  .then(function (users) {
    res.render('user/admin/view-index.hbs', {users, users});
  })
  .catch(function (error) {
    res.flash('error', error.message);
    res.redirect('/error');
  });
}

const newUser = function(req, res) {
  res.render('user/admin/view-new.hbs');
};

const createUser = function(req, res) {
  User.create({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  })
  .then(function (user) {
    res.flash('success', 'User ' + user.email + ' created.');
    res.redirect('/admin/users');
  })
  .catch(function (error) {
    res.flash('error', error.message);
    res.redirect('/admin/users/new');
  });
};

const editUser = function(req, res) {
  User.findById(req.params.id)
    .then(function (user) {
      if(user === null) {
        throw new Error('User ' + req.params.id + ' does not exist.');
        return;
      }
      res.render('user/admin/view-edit.hbs', {user: user});
    })
    .catch(function (error) {
      res.flash('error', error.message);
      res.redirect('/admin/users');
    })
};

const updateUser = function(req, res) {
  User.findById(req.params.id)
    .then(function (user) {
      if(user === null) {
        throw new Error('User ' + req.params.id + ' does not exist.');
        return;
      }
      return user.update({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      })
    })
    .then(function (user) {
      res.flash('success', 'User ' + user.id + ' updated.');
      res.redirect('/admin/users');
    })
    .catch(function (error) {
      res.flash('error', error.message);
      res.redirect('/admin/users/' + req.params.id + '/edit');
    });
};

const destroyUser = function(req, res) {
  User.findById(req.params.id)
  .then(function (user) {
    if(user === null) throw new Error('Cannot delete user ' + req.params.id + '. User not found.');
    return user.destroy();
  })
  .then(function (user) {
    res.flash('success', 'User ' + req.params.id + ' deleted');
    res.redirect('/admin/users');
  })
  .catch(function (error) {
    res.flash('error', error.message);
    res.redirect('/admin/users');
  });
};

router.get('/admin/users', [isAdmin], indexUser);
router.get('/admin/users/new', [isAdmin], newUser);
router.post('/admin/users', [isAdmin], createUser);
router.get('/admin/users/:id/edit', [isAdmin], editUser);
router.post('/admin/users/:id', [isAdmin], updateUser);
router.post('/admin/users/:id/destroy', [isAdmin], destroyUser);

module.exports = router;