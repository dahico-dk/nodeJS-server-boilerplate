const dep=require('./app-dependencies')
const app = dep.express();
dep.mbuilder();
app.use(dep.ddos.express); 
app.use(dep.bodyParser.json());
app.use(dep.cors({
  origin: ["INSERT-ORIGIN-URI-HERE-IF-NEEDED"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization","X-Requested-With","Accept","Origin"]
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers");
  next();
});
//AllowAnonymous
app.get("/jwtsign", (req, res, next) => {
  res.json({
    "token":dep.signAuth({user:"testuser"}),   
  })
})
//token guarded request. Will return 401 without token
app.get("/jwtget", dep.checkAuth, (req, res, next) => {
  res.json({
    "decrypted-data":req.decrypt,   
  })
})
//token guarded request. Will return 401 without token
app.post("/jwtpost", dep.checkAuth, (req, res, next) => {
  res.json({
    "decrypted-data":req.decrypt,   
  })
})









module.exports = app;
