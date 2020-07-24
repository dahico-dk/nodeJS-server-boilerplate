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

module.exports = app;
