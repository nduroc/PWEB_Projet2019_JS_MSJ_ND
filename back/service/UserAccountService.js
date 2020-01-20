const db = require('../utils/db_connect');

/**
 * Create a user account
 * Permit to a new user to create a account
 *
 * body User Created user account object
 * no response value expected for this operation
 **/
exports.createUserAccount = function (username, email, password) {
  return new Promise(function (resolve, reject) {
    SQLcheck = "SELECT * FROM `user` WHERE username = '" + username + "' or email = '" + email + "'";
    SQLquery = "INSERT INTO user (username, email, password) VALUES ('" + username + "' , '" + email + "', '" + password + "')";
    db.querySqlSelect(SQLcheck).then((res) => {
      if (Array.isArray(res) && res.length != 0) {
        resolve(0);
      }
      else {
        db.querySqlInsert(SQLquery).then((res) => {
          resolve(res);
        }).catch(err => reject(err));
      }
    })
  });
}


/**
 * Delete user account
 * Permit to the logged in user to delete his/her account
 *
 * userId String userId of account to delete
 * no response value expected for this operation
 **/
exports.deleteUserAccount = function (userId) {
  return new Promise(function (resolve, reject) {
    SQLquery = "DELETE FROM user WHERE (id='" + userId + "')";
    db.querySqlSelect(SQLquery).then(() => {
      resolve(true);
    }).catch(err => reject(err));
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
exports.loginUserAccount = function (usernameOrEmail, password) {
  return new Promise(function (resolve, reject) {
    let SQLqueryName = "SELECT * FROM user WHERE (username='" + usernameOrEmail + "' and password='" + password + "')";
    db.querySqlSelect(SQLqueryName).then((res) => {
      if (Array.isArray(res) && res.length != 0) {
        resolve(res[0]['id']);
      } else {
        resolve(0);
      }
    }).catch(err => reject(err));
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
exports.updateUserAccount = function (userId, username, email, password) {
  return new Promise(function (resolve, reject) {
    let SQLquery = "UPDATE user SET username='" + username + "', email='" + email + "', password='" + password + "' WHERE id ='" + userId + "'";
    db.querySqlSelect(SQLquery).then((res) => {
      resolve(res);
    }).catch(err => reject(err));
  });
}