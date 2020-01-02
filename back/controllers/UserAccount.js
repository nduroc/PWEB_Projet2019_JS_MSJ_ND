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
  UserAccount.deleteUserAccount("6"/*userId*/)
    .then((deleted) => {
      return deleted
    })
    .catch(err => {
      throw err
    });
};

module.exports.loginUserAccount = function loginUserAccount (req, res) {
  const usernameOrEmail = req.query.usernameOrEmail;
  const password = req.query.password;
  let tmp = "";
  UserAccount.loginUserAccount(usernameOrEmail, password)
    .then((response) => {
      tmp += response;
    })
    .catch(err => {
      return err
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
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
  //const username = req.body.username;
  //const email = req.body.email;
  //const password = req.body.password;
  UserAccount.updateUserAccount("7"/*userId*/,"Robi"/*username*/,"mail"/*email*/,"azerty"/*password*/)
    .then(() => {
      console.log('Update user')
    })
    .catch(err => {
      throw err
    });
};
