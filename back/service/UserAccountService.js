//const db = require('../utils/db_connect')
const mysql = require('mysql');

const db = mysql.createConnection({
  //connectionLimit : 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "pweb"
});

/**
 * Query a Select
 * Return the selected line(s)
 */
function querySqlSelect(sqlQuery) {
  return new Promise(function(resolve, reject) {
    //db.connect(function(err) {
      //if (err) throw err;
      db.query(sqlQuery, function(err, result) {
        if (err) throw err;
        console.log("Select")
        console.log(result)
        resolve(result);
      });
    //});
  });
}

/**
 * Query an Insert sql
 * return the ID of the new line
 */
function querySqlInsert(sqlQuery) {
  return new Promise(function(resolve, reject) {
    //db.connect(function(err) {
      //if (err) throw err;
      db.query(sqlQuery, function(err, result) {
        if (err) throw err;
        console.log("Insert")
        console.log(result)
        resolve(result.insertId);
      });
    //});
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
        // Add check for same username ?
        SQLquery = "INSERT INTO user (username, email, password) VALUES ('" + username + "' , '" + email + "', '" + password + "')";
        querySqlInsert(SQLquery).then((res) => {
          resolve(res)
        }).catch(err => reject(err));
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
    SQLquery = "DELETE FROM user WHERE (id='" + userId + "')";
    querySqlSelect(SQLquery).then(() => {
      resolve(true)
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
exports.loginUserAccount = function(usernameOrEmail,password) {
  return new Promise(function(resolve, reject) {
    let SQLqueryName = "SELECT * FROM user WHERE (username='" + usernameOrEmail + "' and password='" + password + "')"
    querySqlSelect(SQLqueryName).then((res) => {
      if (Array.isArray(res) && res.length != 0) {
        resolve(res[0]['id']);
      } else {
        resolve(0);
      }
    }).catch(err => reject(err));
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
    // Add check for same username ?
    let SQLquery = "UPDATE user SET username='" + username + "', email='" + email + "', password='" + password +"' WHERE id ='" + userId + "'"
    querySqlSelect(SQLquery).then((res) => {
      console.log("update")
      console.log(res)
      resolve(res)
    }).catch(err => reject(err));
  });
}

