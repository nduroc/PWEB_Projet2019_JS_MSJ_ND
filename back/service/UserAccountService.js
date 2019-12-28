//const db = require('../utils/db_connect')
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pweb"
});

function querySql(sqlQuery) {
  return new Promise(function(resolve, reject) {
    db.connect(function(err) {
      if (err) throw err;
      db.query(sqlQuery, function(err, result) {
        if (err) throw err;
        console.log(result)
        resolve(result);
      });
    });
  });
}

/**
 * Create a user account
 * Permit to a new user to create a account
 *
 * body User Created user account object
 * no response value expected for this operation
 **/
exports.createUserAccount = function(username, email, password) {
  return new Promise(function(resolve, reject) {
    let lastId = -1;
    try {
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // Add check for same username ?
        SQLquery = "INSERT INTO user (username, email, password) VALUES ('" + username + "' , '" + email + "', '" + password + "')";
        db.query(SQLquery, function (err, result) {
          if (err) throw err;
          //console.log("1 record inserted, ID: " + result.insertId);
          lastId = result.insertId;
          resolve(lastId);
        });
      });
    } catch (err) {
      reject(lastId);
    }
    reject(-2)//err
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
    deleted = false
    try {
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        SQLquery = "DELETE FROM user WHERE (id='" + userId + "')";
        db.query(SQLquery, function (err, result) {
          if (err) throw err;
          deleted = true
          resolve(deleted);
        });
      });
    } catch (err) {
      reject(deleted);
    }
    //reject(-2)//err
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
    let SQLqueryName = "SELECT * FROM user WHERE (username='" + usernameOrEmail + "' and password='" + password + "')"
    querySql(SQLqueryName).then((res) => {
      if (Array.isArray(res)) {
        resolve(1);
      } else {
        resolve(0);
      }
    }).catch(err => reject(err));
      
    
    /*
    if (Array.isArray(res)) {
      resolve(1);
    }
    reject(0);*/

    //try {
      /*db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        SQLqueryName = "SELECT * FROM user WHERE (username='" + usernameOrEmail + "' and password='" + password + "')"
        db.query(SQLqueryName, function (err, result) {
          if (err)
            throw err;
          if (Array.isArray(result)) {
            isUser = true;
            resolve(isUser);
          }
        });*/
        /*
        SQLqueryEmail = "SELECT * FROM user WHERE (email='" + usernameOrEmail + "' and password='" + password + "')"
        db.query(SQLqueryEmail, function (err, result) {
          if (err) throw err;
          if (Array.isArray(result)) {
            isUser = true;
            resolve(isUser);
          }
        }).then(() => resolve());*/
      //});
    /*} catch (err) {
      reject(isUser);
    }
    reject(isUser);*/
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

