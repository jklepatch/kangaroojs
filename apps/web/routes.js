'use strict';
/**
 * Loads all routes
 * @module routes
 */

const fs = require('fs');
const path = require('path');
const router = require('express').Router();

//If a 'routes.js' file exists in any module, it will be used
fs.readdirSync(path.join(__dirname, 'modules'))
  .filter((module) => module != 'error')
  .forEach(function(module) { 
    const routerFile = path.join(__dirname, 'modules', module, 'routes.js');
    if( fs.existsSync(routerFile)) {
      router.use(require(routerFile));
    }
  });

router.use(require('./modules/error/routes.js'))

module.exports = router;
