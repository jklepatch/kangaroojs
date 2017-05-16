'use strict';

/*
 * Setup views:
 * - Setup view engine as handlebars, with custom config
 * - Register helper functions to be used in templates
 * @module views
 */

const hbs = require('express-hbs');
const config     = require('../../config');
const path = require('path');
const fs = require('fs');

const configureViews = function(app){
  setupViewEngine(app, hbs);
  registerHelpers(hbs);
};

/*
 * - Layouts and partials are located in `./shared/views`
 * - Default layout is `default.hbs`
 * - Layouts can be overridden by specifying the
 *   layout file to use when calling `res.render()` function.
 *   Example: 
 *   ```
 *   res.render('page/view-home', {layout: 'my-layout.hbs'});
 *   ```
 */
function setupViewEngine(app, hbs) {
  app.set('view engine', 'hbs');
  app.set('views', config.app.path + '/modules');
  app.engine('hbs', hbs.express4({
    defaultLayout: config.app.path + '/shared/views/layouts/default.hbs',
    layoutsDir:    config.app.path + '/shared/views/layouts',
    partialsDir:   config.app.path + '/shared/views/partials'
  }));
}

/*
 * To add other helpers, just add others files in './shared/views/helpers' directory
 * Use the template below:
 * 
 * ```
 * 'use strict';
 * 
 * const registerHelpers = function(hbs) {
 *   hbs.registerHelper('helperName', function(val) {
 *     //Define what to do with val here
 *     return val;
 *   });
 * };
 * 
 * module.exports = registerHelpers;
 * ```
 */
function registerHelpers(hbs) {
  const helpersDirectory = path.join(__dirname, 'shared/views/helpers');
  fs.readdirSync(path.join(helpersDirectory))
    .forEach(function(helperFile) { 
      require(path.join(helpersDirectory, helperFile))(hbs);
    });
}

module.exports = configureViews;