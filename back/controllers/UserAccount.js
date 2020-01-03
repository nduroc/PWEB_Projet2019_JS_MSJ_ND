'use strict';

const utils = require('../utils/writer.js');
const UserAccount = require('../service/UserAccountService');

module.exports.createUserAccount = function createUserAccount (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  let tmp = "";
  UserAccount.createUserAccount(username, email, password)
    .then((userID) => {
      tmp += userID;
    })
    .catch(err => {
      tmp += err;
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.deleteUserAccount = function deleteUserAccount (req, res, userId) {
  let tmp = "";
  UserAccount.deleteUserAccount(userId)
    .then((deleted) => {
      return deleted
    })
    .catch(err => {
      tmp += err;
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.loginUserAccount = function loginUserAccount (req, res) {
  const usernameOrEmail = req.query.usernameOrEmail;
  const password = req.query.password;
  let tmp = "";
  UserAccount.loginUserAccount(usernameOrEmail, password)
    .then((response) => {
      console.log(response)
      tmp += response;
    })
    .catch(err => {
      tmp += err;
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
