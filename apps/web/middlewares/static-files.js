'use strict';

/**
 * Serve request for static files
 * @module static-files
 */

const express = require('express');
const router = require('express').Router();

router.use(express.static('public'));

module.exports = router;