'use strict';

/**
 * Loads all the middlewares
 * @module middlewares
 */

const router = require('express').Router();

router.use(require('./security.js'));
router.use(require('./static-files.js'));
router.use(require('./session.js'));
router.use(require('./flash.js'));
router.use(require('./body-parser.js'));
router.use(require('./template-variables.js'));

module.exports = router;