var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pweb"
});

db.connect(function(err, SQLquery) {
  if (err) throw err;
  console.log("Connected!");

  //var sql = "INSERT INTO user (username, email, password) VALUES ('Robert', 'email@example.com', '123456789')";
  db.query(SQLquery, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });

});

module.exports = {
    db
  }
  