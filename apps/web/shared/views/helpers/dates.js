'use strict';

const moment = require('moment');

const registerHelpers = function(hbs) {
  hbs.registerHelper('formatDate', function(date) {
    return new hbs.SafeString(moment(date).fromNow());
  });
}

module.exports = registerHelpers;