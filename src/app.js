const dep = require("./app-dependencies");
const appsetup = require("./app-setup");
const config = require("../server-config.json");
const app = dep.express();
//setup dependencies of the app
appsetup(app);

app.use(function (req, res, next) {
  res.set('X-Clacks-Overhead', 'GNU Terry Pratchet');
  next();
});
//AllowAnonymous
app.get("/jwtsign", (req, res, next) => {
  res.json({
    token: dep.signAuth({ user: "testuser" }),
  });
});
//token guarded request. Will return 401 without token
app.get("/jwtget", dep.checkAuth, (req, res, next) => {
  res.json({
    "decrypted-data": req.decrypt,
  });
});
//token guarded request. Will return 401 without token
app.post("/jwtpost", dep.checkAuth, (req, res, next) => {
  res.json({
    "decrypted-data": req.decrypt,
  });
});

//unprotected
app.get("/mssqltest", (req, res, next) => {
  dep.mssql.query("Select top 1 * from TestTable").then((result) => {
    console.log(result);
  });
});

//unprotected
app.get("/mysqltest", (req, res, next) => {
  dep.mysql.query("Select * from TestTable", (result) => {
    console.log(result);
  });
});

module.exports = app;
