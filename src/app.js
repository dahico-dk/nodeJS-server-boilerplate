const dep = require('./app-dependencies');
const appsetup=require("./app-setup");
const config=require("../server-config.json");
const app = dep.express();
//setup dependencies of the app
appsetup(app);

//AllowAnonymous
app.get("/jwtsign", (req, res, next) => {
  res.json({
    "token": dep.signAuth({ user: "testuser" }),
  })
})
//token guarded request. Will return 401 without token
app.get("/jwtget", dep.checkAuth, (req, res, next) => {
  res.json({
    "decrypted-data": req.decrypt,
  })
})
//token guarded request. Will return 401 without token
app.post("/jwtpost", dep.checkAuth, (req, res, next) => {
  res.json({
    "decrypted-data": req.decrypt,
  })
})

app.get("/mssqltest", (req, res, next) => {
  console.log(dep.mssql.query);
  var test=dep.mssql.query("Select * from Token");
  console.log(test);
  res.json({
    "token": dep.signAuth({ user: "testuser" }),
  })
})

module.exports = app;
