const mysql = require('mysql');

const db = mysql.createConnection({
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
 * Query an Insert sql
 * return the ID of the new line
 */
function querySqlInsert(sqlQuery) {
  return new Promise(function(resolve, reject) {
    db.connect(function(err) {
      if (err) throw err;
      db.query(sqlQuery, function(err, result) {
        if (err) throw err;
        console.log(result)
        resolve(result.insertId);
      });
    });
  });
}


module.exports = {
  querySqlSelect,
  querySqlInsert
  }
  