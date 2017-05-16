'use strict';

/*
 * It is a virtual model, not backed by mysql and sequelize
 * That is why it is not in the /models folder
 */

const login = function (req, res, user) {
  req.session.user = user; //console.log(req.session.user)
}

const signOut = function (req, res) {
  req.session.user = null;
}

const Session = {
  login: login,
  signOut: signOut
};

module.exports = Session;