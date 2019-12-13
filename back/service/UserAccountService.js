'use strict';


/**
 * Create a user account
 * Permit to a new user to create a account
 *
 * body User Created user account object
 * no response value expected for this operation
 **/
exports.createUserAccount = function(username, email, password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete user account
 * Permit to the logged in user to delete his/her account
 *
 * userId String userId of account to delete
 * no response value expected for this operation
 **/
exports.deleteUserAccount = function(userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logs user to his/her account on the system
 * Permit to a registres user to connect to his/her account
 *
 * username/email String The username/email for login
 * password String The password for login in clear text
 * no response value expected for this operation
 **/
exports.loginUserAccount = function(usernameOrEmail,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logs out current logged in user account session
 * Function to log out current logged in user account session
 *
 * no response value expected for this operation
 **/
exports.logoutUserAccount = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update user account
 * Permit to the logged in user to modify his/her account
 *
 * userId String userId of account to update
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUserAccount = function(userId,username,email,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

