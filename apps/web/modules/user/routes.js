'use strict';

const router = require('express').Router();
const adminRoutes = require('./admin/routes.js');
const publicRoutes = require('./public/routes.js');

router.use(adminRoutes);
router.use(publicRoutes);

module.exports = router;