var mysql = require("mysql");
const config = require(__basedir + "/server-config.json");
var connection = mysql.createConnection({
  host: config["mysql-server"],
  database: config["mysql-database"],
  user: config["mysql-user"],
  password: config["mysql-password"],
});



const query = (query,callback) => { 
  return connection.query(query, function (error, result, fields) {
    if (error) console.log(error);
    connection.end();   
    callback(result);
  });
};

module.exports = {
  query: query,
};
