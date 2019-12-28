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
    try {
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // Add check for same username ?
        SQLquery = "INSERT INTO user (username, email, password) VALUES ('" + username + "' , '" + email + "', '" + password + "')";
        db.query(SQLquery, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
        });
      });
    } catch (err) {
        reject();
    }
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
    try {
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        SQLquery = "DELETE FROM user WHERE (id='" + userId + "')";
        db.query(SQLquery, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
        });
      });
    } catch (err) {
        reject();
    }
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
    try {
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        SQLquery = "SELECT * FROM user WHERE (username='" + usernameOrEmail + "' and password='" + password + "')";
        SQLquery = "SELECT * FROM user WHERE (email='" + usernameOrEmail + "' and password='" + password + "')"
        db.query(SQLquery, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
        });
      });
    } catch (err) {
        reject();
    }
  
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

