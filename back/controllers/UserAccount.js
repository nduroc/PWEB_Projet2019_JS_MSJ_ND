'use strict';

const utils = require('../utils/writer.js');
const UserAccount = require('../service/UserAccountService');

module.exports.createUserAccount = function createUserAccount (req, res) {
  //const username = req.body.username;
  //const email = req.body.email;
  //const password = req.body.password;
  UserAccount.createUserAccount(/*username*/"Robert", "Du-lac"/*email*/, "123456789"/*password*/)
    .then((userID) => {
      return userID
    })
    .catch(err => {
      throw err
    });
};

module.exports.deleteUserAccount = function deleteUserAccount (req, res, userId) {
  UserAccount.deleteUserAccount(userId)
    .then((deleted) => {
      return deleted
    })
    .catch(err => {
      throw err
    });
};

module.exports.loginUserAccount = function loginUserAccount (req, res) {
  //const usernameOrEmail = req.params.usernameOrEmail;
  //const password = req.params.password;
  UserAccount.loginUserAccount("Robert"/*usernameOrEmail*/, "123456789"/*password*/)
    .then((res) => {
      if (res == 1)
        return true
      else
        return false
    })
    .catch(err => {
      return err
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
