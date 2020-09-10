# NodeJS Rest Api Boilerplate (NodeApi)

NodeApi is a boilerplate for developers who wants to setup a simple nodejs rest api with express. It can configured to use socket.io and mongodb with mongoose npm package. A lot of packages has been already setup for shorter development time. 

### Running server 
server start command implemented in the package.json file

```
//for starting server
npm run server
```

_Project can be easily configured from server-config.js file which resides in root folder of the project._
```

{
    "jwt-secret":"A_VERY_SECRET_STRING_THAT_NOONE_SHOULD_KNOW",
    "socket-server":true,  
    "mongo-db-connection":false,
    "mongo-db-connection-string":"mongodb://localhost/test",
    "cors-origin-uri":"CORS-ORİGİN-URI ",
    "use-cors":true,
    "socketio-url":"http://localhost:3000/",
    "mssql-server": "MSSQL-SERVER-ADRESS",
    "mssql-database":"MSSQL-SERVER-DB",
    "mssql-user":"MSSQL-SERVER-USER",
    "mssql-password":"MSSQL-SERVER-PASSWORD",
    "mysql-server": "mySQL-SERVER-ADRESS",
    "mysql-database":"mySQL-SERVER-DB",
    "mysql-user":"mySQL-SERVER-USER",
    "mysql-password":"mySQL-SERVER-PASSWORD"
}
```
* *jwt-secret* : secret string for jwt token encryption
* *socket-server* : turns on socket.io
* *mongo-db-connection* : turns on mongodb connection (mongoose)
* *mongo-db-connection-string* : connection string for mongodb
* *cors-origin-uri* : origin uri of cors
*  socketio-url : the url socketio runs for testing. It is the url of the server.
* *mssql-...* : Mssql properties for mssql connection.
* *mysql-...* : Mysql properties for mssql connection.

MSSQL and MYSQL drivers don't work like mongoose. They don't need a true/false configuration. The drivers will work if the properties for the server is right.

## Project Structure

```

├───middleware
│   └───auth
│           checkAuth.js  //jwt token verification
│           secret.js //jwt secret
│           signAuth.js //jwt token creation
│
├───MongoDB
│   │   mongooseBuilder.js //mongoose settings
│   │
│   └───Models
│           exampleSchema.js
│
│
├───MSSql
│     mssql.js //mssql connect file
│
│
├───MySQL
│     mysql.js //mysql connect file
│
│
├───SocketIO
│       socketserver.js  //socket.io configuration
│       socketservertest.js  //test code for socket.io
│
└───src
        app-dependencies.js  //dependencies and custom middlewares of the app
        app-setup.js  //middleware setup of the app
        app.js 


```

### Using app-dependencies.js file

All the dependencies of the express project resides in this file. It is created to avoid clutter on the app.js file.In the following example dependency file used for jwt middleware.

```
//dep object is import of app-dependencies.js file
const dep = require('./app-dependencies');
```
#### create a jwt token

SignAuth can be used for creating jwt tokens.
```
//AllowAnonymous
app.get("/jwtsign", (req, res, next) => {
  res.json({
    "token": dep.signAuth({ user: "testuser" }),
  })
})
```
#### jwt secret

The secret key of the jwt process resides in *server-config.js*

#### checkAuth middleware blocks requests without token

```
//token guarded request. Will return 401 without token
//decrypted token is in the req.decrypt
//dep is the dependency file
app.get("/jwtget", dep.checkAuth, (req, res, next) => {
  res.json({
    "decrypted-data": req.decrypt,
  })
})
```

### app-setup.js

App-setup js file is for implementing npm packages like ddos, bodyparser, cors and builds mongodb connection. Some packages are already imported. 

```
app.use(dep.ddos.express);
app.use(dep.bodyParser.json());
```


### Testing socket.io

There is a socketio-client functionality file resides in the SocketIO folder. Which tries connects to socketio with socketio-url property of the config file and send a hello message for test purposes. It is implemented in the package.json file. Server must be running.

```
//for testing socket.io
npm run testsocket
```

### MSSQL and MYSQL
There is a example function for mysql and mssql queries in the app.js file for mssql. The packages are using raw queries. They are both tested with live db.

#####  MSSQL
```
 dep.mssql.query("Select top 1 * from TestTable").then((result) => {
    console.log(result);
  });
```

#####  MYSQL
```
 dep.mysql.query("Select * from TestTable", (result) => {
    console.log(result);
  });
```
 



### MongoDB

The mongoose package already imported in the project. MongoDB/mongooseBuilder.js file implements basic mongoDB connection. The connection uses mongo-db-connection-string property of the config file. Also there is a exampleSchema in the Models folder.





##### Implemented Packages
* cors
* ddos
* mongoose
* socketio
* socketio-client
* express
* body-parser
* mysql
* mssql
