'use strict';

const registerHelpers = function(hbs) {
  hbs.registerHelper('excerpt', function(body) {
    return body.substr(0, 200) + ' ... <b>Read more</b>';
  });
}

module.exports = registerHelpers;