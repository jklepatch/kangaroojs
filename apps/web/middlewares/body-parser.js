'use strict';

/**
 * Parse fields in POST request and make them available in `req.body`
 * @module body-parser
 */

const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

module.exports = router;