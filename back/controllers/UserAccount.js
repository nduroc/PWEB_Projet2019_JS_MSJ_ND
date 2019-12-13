'use strict';

var utils = require('../utils/writer.js');
var UserAccount = require('../service/UserAccountService');

module.exports.createUserAccount = function createUserAccount (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  UserAccount.createUserAccount(username, email, password)
    .then(() => {
      console.log('New user account')
    })
    .catch(err => {
      throw err
    });
};

module.exports.deleteUserAccount = function deleteUserAccount (req, res) {
  var userId = req.params.userId;
  UserAccount.deleteUserAccount(userId)
    .then(() => {
      console.log('Deleted User')
    })
    .catch(err => {
      throw err
    });
};

module.exports.loginUserAccount = function loginUserAccount (req, res) {
  var usernameOrEmail = req.params.usernameOrEmail;
  var password = req.params.password;
  UserAccount.loginUserAccount(usernameOrEmail,password)
    .then(() => {
      console.log('Login user')
    })
    .catch(err => {
      throw err
    });
};

module.exports.logoutUserAccount = function logoutUserAccount (req, res) {
  UserAccount.logoutUserAccount()
    .then(() => {
      console.log('Logout user')
    })
    .catch(err => {
      throw err
    });
};

module.exports.updateUserAccount = function updateUserAccount (req, res) {
  var userId = req.params.userId;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  UserAccount.updateUserAccount(userId,username,email,password)
    .then(() => {
      console.log('Update user')
    })
    .catch(err => {
      throw err
    });
};
