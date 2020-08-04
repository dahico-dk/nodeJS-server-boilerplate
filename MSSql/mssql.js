var sql = require("mssql");
const config=require(__basedir+ "/server-config.json");
 
var webconfig = {
    server: config["mssql-server"],
    database:config["mssql-database"],
    user:config["mssql-user"],
    password:config["mssql-password"]
};
 

 
sql.on('error', err => {
    // ... error handler
})
 


module.exports={
    query:function query(a){    
        sql.on('error', err => {
            // ... error handler
        })       
        sql.connect(webconfig).then(pool => {
            // Query
            
            return pool.request()
                // .input('input_parameter', sql.Int, value)
                .query('select * from Token')
        }).then(result => {
            console.dir(result)
        }).catch(err => {
          // ... error checks
        });
        
         
    }
    
}

 
