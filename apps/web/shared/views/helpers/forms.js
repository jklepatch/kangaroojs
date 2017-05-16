'use strict';

const registerHelpers = function(hbs) {
  hbs.registerHelper('isSelected', function(curVal, optVal) {
    return curVal === optVal ? 'selected' : '';
  });
}

module.exports = registerHelpers;