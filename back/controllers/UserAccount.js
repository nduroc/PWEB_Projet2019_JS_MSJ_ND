'use strict';

const utils = require('../utils/writer.js');
const UserAccount = require('../service/UserAccountService');

module.exports.createUserAccount = function createUserAccount (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  UserAccount.createUserAccount(username, email, password)
    .then(() => {
      console.log('New user account')
    })
    .catch(err => {
      throw err
    });
};

module.exports.deleteUserAccount = function deleteUserAccount (req, res, userId) {
  UserAccount.deleteUserAccount(userId)
    .then(() => {
      console.log('Deleted User')
    })
    .catch(err => {
      throw err
    });
};

module.exports.loginUserAccount = function loginUserAccount (req, res) {
  const usernameOrEmail = req.params.usernameOrEmail;
  const password = req.params.password;
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

module.exports.updateUserAccount = function updateUserAccount (req, res, userId) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  UserAccount.updateUserAccount(userId,username,email,password)
    .then(() => {
      console.log('Update user')
    })
    .catch(err => {
      throw err
    });
};
