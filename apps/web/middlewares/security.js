'use strict';

/**
 * Handles security stuffs with helmet module
 * @module security
 */

const router = require('express').Router();
const helmet = require('helmet');

router.use(helmet());

module.exports = router;