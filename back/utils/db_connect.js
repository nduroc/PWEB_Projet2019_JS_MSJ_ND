const mysql = require('mysql');

/**
 * If you want to make a connection to another dataBase,
 * it is needed to change 'host', 'user', 'password' and 'database'
 * to the new dataBase configuration
 */
const db = mysql.createConnection({
  host: "dbserver",
  user: "nduroc",
  password: "123456789",
  database: "nduroc"
});

/**
 * Query a Select
 * Return the selected line(s)
 */
function querySqlSelect(sqlQuery) {
  return new Promise(function (resolve, reject) {
    db.query(sqlQuery, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
}

/**
 * Query an Insert sql
 * return the ID of the new line
 */
function querySqlInsert(sqlQuery) {
  return new Promise(function (resolve, reject) {
    db.query(sqlQuery, function (err, result) {
      if (err) throw err;
      resolve(result.insertId);
    });
  });
}

function querySqlUpdate(sqlQuery) {
  return new Promise(function (resolve, reject) {
    db.query(sqlQuery, function (err, result) {
      if (err) throw err;
      resolve(result.affectedRows);
    });
  });
}

function querySqlDelete(sqlQuery) {
  return new Promise(function (resolve, reject) {
    db.query(sqlQuery, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
}


module.exports = {
  querySqlSelect,
  querySqlInsert,
  querySqlUpdate,
  querySqlDelete
}
