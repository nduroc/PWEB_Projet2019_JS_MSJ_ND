const mysql = require('mysql');

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
      console.log(result)
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
      console.log(result)
      resolve(result.insertId);
    });
  });
}

function querySqlUpdate(sqlQuery) {
  return new Promise(function (resolve, reject) {
    db.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log(result)
      resolve(result.affectedRows);
    });
  });
}



module.exports = {
  querySqlSelect,
  querySqlInsert,
  querySqlUpdate
}
