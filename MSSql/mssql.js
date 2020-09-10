var sql = require("mssql");
const config = require(__basedir + "/server-config.json");

var webconfig = {
  server: config["mssql-server"],
  database: config["mssql-database"],
  user: config["mssql-user"],
  password: config["mssql-password"],
  encrypt: false,
};
const query = async (query) => {
  try {
    await sql.connect(webconfig);
    return await sql.query(query);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  query: query,
};
