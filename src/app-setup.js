const dep = require("./app-dependencies");
const config=require("../server-config.json");

//Insert static mw here!!!
function appsetup(app){
    app.use(dep.ddos.express);
    app.use(dep.bodyParser.json());
    !config["use-cors"]||app.use(dep.cors({
      origin: [config["cors-origin-uri"]],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"]
    }));
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      res.header("Access-Control-Allow-Headers");
      next();
    });
    //Change server-config.json for enable/disable mongodb
    !config["mongo-db-connection"]|| dep.mbuilder();

}
module.exports=appsetup;
