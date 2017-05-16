'use strict';

const router = require('express').Router();

const indexUser = function(req, res) {
  User.find({all})
  .then(function (users) {
    res.render('user/public/view-index.hbs', {users, users});
  })
  .catch(function (error) {
    res.flash('error', error.message);
    res.render('errors/view-errors.hbs');
  });
}

const errorView = function (req, res) {
  res.render('error/view-error.hbs');
};

const notFoundView = function (req, res) {
  res.render('error/view-404.hbs');
};



router.get('/error', errorView);
router.get('/notfound', notFoundView);
router.get('*', notFoundView);

/*
 * Route and controllers used for testing error view
 */
const createFlash = function (req, res) {
  const type = req.params.type || 'success';
  const message = req.params.message || '';
  res.flash(type, message);
  res.send('ok');
}

if(process.env.NODE_ENV === 'test') {
  router.post('/flash/:type/:message', createFlash);
}

module.exports = router;